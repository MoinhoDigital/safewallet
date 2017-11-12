/*
  Helper functions to store data in the SAFEnet
*/
import crypto from 'crypto'

let APP_HANDLE = null
const OWNER_OF_MINTED_COINS = 'GENESIS'
const SERVICE_NAME_POSTFIX = '@email'

const TAG_TYPE_DNS = 15001
const TAG_TYPE_THANKS_COIN = 21082018
const TAG_TYPE_WALLET_TX_INBOX = 20082018

const COIN_ENTRY_KEY_DATA = 'coin-data'
const MD_KEY_EMAIL_ENC_PUBLIC_KEY = '__email_enc_pk'
const MD_KEY_TX_ENC_PUBLIC_KEY = '__tx_enc_pk'

const _genXorName = (appHandle, str) => window.safeCrypto.sha3Hash(appHandle, str)
const _genRandomEntryKey = () => crypto.randomBytes(32).toString('hex')
const _genTxId = () => crypto.randomBytes(16).toString('hex')

export const authoriseApp = (appInfo) => {
  console.log('Authenticating app...')

  return window.safeApp.initialise(appInfo)
    .then((appHandle) => {
      APP_HANDLE = appHandle
      console.log('App handle retrieved: ', appHandle)
      return window.safeApp.authorise(APP_HANDLE, {})
    })
    .then((authUri) => window.safeApp.connectAuthorised(APP_HANDLE, authUri))
    .then(() => console.log('The app was authorised'))
    .catch((err) => console.error('Error when trying to authorise the app: ', err))
}

export const mintCoin = (appHandle, pk) => {
  const coin = { owner: pk, prev_owner: OWNER_OF_MINTED_COINS }
  const coinData = { [COIN_ENTRY_KEY_DATA]: JSON.stringify(coin) }

  let permSetHandle
  let coinXorName
  return window.safeMutableData.newRandomPublic(appHandle, TAG_TYPE_THANKS_COIN)
    .then((coinHandle) => window.safeMutableData.quickSetup(coinHandle, coinData)
      .then(() => window.safeMutableData.newPermissionSet(appHandle))
      .then((pmSetHandle) => (permSetHandle = pmSetHandle))
      .then(() => window.safeMutableDataPermissionsSet.setAllow(permSetHandle, 'Update'))
      .then(() => window.safeMutableData.setUserPermissions(coinHandle, null, permSetHandle, 1))
      .then(() => window.safeMutableDataPermissionsSet.free(permSetHandle))
      .then(() => window.safeMutableData.getNameAndTag(coinHandle))
      .then((res) => (coinXorName = res.name.buffer.toString('hex')))
      .then(() => window.safeMutableData.free(coinHandle))
    )
    .then(() => coinXorName)
}

const _encrypt = (appHandle, input, pk) => {
  if (Array.isArray(input)) {
    input = input.toString()
  }

  return window.safeCrypto.pubEncKeyKeyFromRaw(appHandle, Buffer.from(pk, 'hex'))
    .then((pubEncKeyHandle) => window.safeCryptoPubEncKey.encryptSealed(pubEncKeyHandle, input))
}

export const sendTxNotif = (appHandle, pk, coinIds, name) => {
  let txId = _genTxId()
  let tx = {
    coinIds: coinIds,
    name,
    date: (new Date()).toUTCString()
  }

  console.log('Sending TX notification to recipient. TX id: ', txId)
  console.log('appHandle: ', appHandle)

  return _genXorName(appHandle, pk)
    .then((xorName) => window.safeMutableData.newPublic(appHandle, xorName, TAG_TYPE_WALLET_TX_INBOX))
    .then((txInboxHandle) => window.safeMutableData.get(txInboxHandle, MD_KEY_TX_ENC_PUBLIC_KEY)
      .then((encPk) => _encrypt(appHandle, JSON.stringify(tx), encPk.buf.toString()))
      .then((encryptedTx) => window.safeMutableData.newMutation(appHandle)
        .then((mutHandle) => window.safeMutableDataMutation.insert(mutHandle, txId, encryptedTx)
          .then(() => window.safeMutableData.applyEntriesMutation(txInboxHandle, mutHandle)
            .then(() => window.safeMutableData.free(txInboxHandle))
          )
          .then(() => window.safeMutableDataMutation.free(mutHandle))
        )
      )
    )
}

const _writeEmailContent = (appHandle, email, pk) => {
  return _encrypt(appHandle, JSON.stringify(email), pk)
    .then(encryptedEmail => window.safeImmutableData.create(appHandle)
       .then((emailHandle) => window.safeImmutableData.write(emailHandle, encryptedEmail)
         .then(() => window.safeCipherOpt.newPlainText(appHandle))
         .then((cipherOptHandle) => window.safeImmutableData.closeWriter(emailHandle, cipherOptHandle))
       )
    )
}

const _splitPublicIdAndService = (emailId) => {
  // It supports complex email IDs, e.g. 'emailA.myshop', 'emailB.myshop'
  let str = emailId.replace(/\.+$/, '')
  let toParts = str.split('.')
  const publicId = toParts.pop()
  const serviceId = str.slice(0, -1 * (publicId.length + 1))
  emailId = (serviceId.length > 0 ? (serviceId + '.') : '') + publicId
  const serviceName = serviceId + SERVICE_NAME_POSTFIX
  return {emailId, publicId, serviceName}
}

const _genServiceInfo = (appHandle, emailId) => {
  let serviceInfo = _splitPublicIdAndService(emailId)
  return _genXorName(appHandle, serviceInfo.publicId)
    .then((hashed) => {
      serviceInfo.serviceAddr = hashed
      return serviceInfo
    })
}

const _storeEmail = (appHandle, email, to) => {
  let serviceInfo
  return _genServiceInfo(appHandle, to)
    .then((info) => (serviceInfo = info))
    .then(() => window.safeMutableData.newPublic(appHandle, serviceInfo.serviceAddr, TAG_TYPE_DNS))
    .then((servicesHandle) => window.safeMutableData.get(servicesHandle, serviceInfo.serviceName)
      .catch((err) => { console.log('Email id not found' + err.toString()) })
      .then((service) => window.safeMutableData.fromSerial(servicesHandle, service.buf))
      .then((inboxHandle) => window.safeMutableData.get(inboxHandle, MD_KEY_EMAIL_ENC_PUBLIC_KEY)
        .then((pk) => _writeEmailContent(appHandle, email, pk.buf.toString())
          .then((emailAddr) => window.safeMutableData.newMutation(appHandle)
            .then((mutHandle) => {
              let entryKey = _genRandomEntryKey()
              return _encrypt(appHandle, emailAddr, pk.buf.toString())
                .then((entryValue) => window.safeMutableDataMutation.insert(mutHandle, entryKey, entryValue)
                  .then(() => window.safeMutableData.applyEntriesMutation(inboxHandle, mutHandle))
                )
            })
          )))
    )
}

export const sendEmail = (appHandle, rating, comments, emailId) => {
  console.log('Sending email, appHandle: ', appHandle)
  let emailContent = {
    subject: 'SAFE Wallet feedback',
    from: 'SAFE Faucet',
    time: (new Date()).toUTCString(),
    body: '[' + rating + ' star/s] ' + comments
  }

  return _storeEmail(appHandle, emailContent, emailId)
    .then(() => console.log('Email sent'))
}
