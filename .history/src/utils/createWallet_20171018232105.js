export default async function (appHandle, encPk) {
  let baseWallet = {
    __wallet_enc_pk: encPk.publicKey
  }

  try {
    const mdHandle = await window.safeMutableData.newRandomPublic(appHandle, 15003)
    const walletMd = await window.safeMutableData.quickSetup(mdHandle, baseWallet, 'SafeWallet1', 'SafeWallet Data')
    const permSet = await window.safeMutableData.newPermissionSet(appHandle)
    await window.safeMutableDataPermissionsSet.setAllow(permSet, 'Insert')
    await window.safeMutableData.setUserPermissions(walletMd, null, permSet, 1)
    return walletMd

  } catch (err) {
    console.dir(err)
    return err
  }
}
