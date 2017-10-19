export default async function (appHandle, publicNamesHandle, walletSerialised, publicId, walletId) {
  const encPublicId = await window.safeCrypto.sha3Hash(appHandle, publicId)
  const mdHandle = await window.safeMutableData.newPublic(appHandle, encPublicId, 15001)
  await window.safeMutableData.quickSetup(mdHandle, walletSerialised,
    'Public Id: ' + publicId,
    'Wallet Id: ' + walletId)
  const mutationHandle = await window.safeMutableData.newMutation(mdHandle)
  const encDataKey = await window.safeMutableData.encryptKey(publicNamesHandle, publicId)
  console.log('encDataKey', encDataKey)
  const encDataValue = await window.safeMutableData.encryptValue(publicNamesHandle, encPublicId)
  console.log('encDataValue', encDataValue)
  await window.safeMutableDataMutation.insert(mutationHandle, encDataKey, encDataValue)
  await window.safeMutableData.applyEntriesMutation(publicNamesHandle, mutationHandle)
  return null
}
