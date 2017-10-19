import genNewAccount from './genNewAccount'
import createPublicIdAndWalletService from './createPublicIdAndWalletService'
import registerWalletService from './registerWalletService'
import requestShareMdAuth from './requestShareMdAuth'

export const initialiseApp = async function (appId, appName, appVendor) {
  if (!window.safeApp) {
    return false
  }
  const appInfo = {
    id: appId || 'net.maidsafe.test.safewallet.example1',
    name: appName || 'Safe App',
    vendor: appVendor || 'Anonymous',
    scope: null
  }

  try {
    const appHandle = await window.safeApp.initialise(appInfo)
    return appHandle
  } catch (err) {
    console.log(err)
  }
}

export const connectAndAuthorizeApp = async function (appHandle) {
  const authUri = await window.safeApp.authorise(
    appHandle, {
      _public: ['Read', 'Insert', 'Update', 'Delete'],
      _publicNames: ['Read', 'Insert', 'Update', 'Delete']
    }, {
      own_container: true
    }
  )
  const session = await window.safeApp.connectAuthorised(appHandle, authUri)
  console.log('Created authorized session with new appHandle: ', session)
  return {
    appHandle: session,
    authUri
  }
}

// const genServiceInfo = (app, emailId) => {
  // let serviceInfo = splitPublicIdAndService(emailId)
  // return app.crypto.sha3Hash(serviceInfo.publicId)
  //   .then((hashed) => {
  //     serviceInfo.serviceAddr = hashed
  //     return serviceInfo
  //   })
// }

export const setupAccount = async function (appHandle, publicId) {
  console.log('setting up with: ', appHandle, publicId)
  // ??? id ???
  const id = `${publicId}@safewallet`
  // Check if app has persmission to access _publicNames to Read
  const hasPermission = await window.safeApp.canAccessContainer(appHandle, '_publicNames', ['Read'])
  // If we have permission...
  if (hasPermission) {
    // Get _publicNames container
    const pubNamesHandle = await window.safeApp.getContainer(appHandle, '_publicNames')
    // Get user publicId from _publicNames container
    const encPubId = await window.safeMutableData.encryptKey(pubNamesHandle, publicId)
    // Try to get ecrypted keys from _publicNames container using encrypted ID
    try {
      const publicName = await window.safeMutableData.get(pubNamesHandle, encPubId)
      const xorName = await window.safeMutableData.decrypt(pubNamesHandle, publicName.buf)
      const appSignKey = await window.safeCrypto.getAppPubSignKey(appHandle)
      const md = await window.safeMutableData.newPublic(appHandle, xorName, 15001)
      await window.safeMutableData.getUserPermissions(md, appSignKey)
      try {
        const success = await registerWalletService(appHandle, id, xorName)
        console.log('SUCCESS', success)
        return success
      } catch (err) {
        requestShareMdAuth(appHandle, [{
          type_tag: 15001,
          name: xorName,
          perms: ['Insert']
        }])
      }
    } catch (err) {
      if (err.code !== -106) {
        console.log('Some error', err)
      } else {
        // If ID doesn't exit, create wallet with ID
        // Generate new wallet for publicId
        console.log('Doesnt have Start generating wallet.')
        const newAccount = await genNewAccount(appHandle, id)
        const walletSerialised = await window.safeMutableData.serialise(newAccount.walletMd)
        await createPublicIdAndWalletService(
          appHandle,
          pubNamesHandle,
          walletSerialised,
          publicId
        )
        return {
          id,
          walletMd: newAccount.walletMd,
          encSk: newAccount.encSk,
          encPk: newAccount.encPk
        }
      }
    }
  }
}
