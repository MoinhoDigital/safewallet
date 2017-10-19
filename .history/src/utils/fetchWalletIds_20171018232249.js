import fetchPublicIds from './fetchPublicIds'
import {
  Promise
} from 'es6-promise'

export default async function (appHandle) {
  let walletIds = []
  const publicIds = await fetchPublicIds(appHandle)
  const prom = publicIds.map(async(publicId) => {
    console.log('publicID', publicId)
    let rawWalletIds = []

    const servicesHandle = await window.safeMutableData.newPublic(appHandle, publicId.service, 15001)
    const entriesHandle = await window.safeMutableData.getEntries(servicesHandle)

    await window.safeMutableDataEntries.forEach(entriesHandle, (k, v) => {
      console.log('Key: ', k.toString())
      console.log('Value: ', v.buf.toString())
      console.log('Version: ', v.version)
      rawWalletIds.push({
        [k.toString()]: v.buf.toString()
      })
    })


    // rawWalletIds.map((walletId) => {
    //   // Let's filter out the services which are not email services,
    //   // i.e. those which don't have the `@email` postfix.
    //   // This will filter out the MD metadata entry also.

    //   // TODO NESSA PARTE ELE TA RETORNANDO UM NUMERO NO walletId TEORICAMENTE TERIA QUE RETORNAR ALGO ASSIM wallet1@safewallet
    //   const regex = new RegExp('.*(?=' + '@safewallet' +'$)', 'g')
    //   let res = regex.exec(walletId)
    //   console.log('walletID:', walletId)
    //   console.log('regex', regex)
    //   console.log('res', res)
    //   if (res) {
    //     console.log('id', res[0] + ((res[0].length > 0) ? '.' : '') + publicId.id)
    //     walletIds.push(res[0] + ((res[0].length > 0) ? '.' : '') + publicId.id)
    //   }
    // })
  })

  await Promise.all(prom)

  return walletIds
}
