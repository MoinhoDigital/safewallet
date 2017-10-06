export default (app, encPk) => {
    let baseWallet = {
      __wallet_enc_pk: encPk
    };
    let walletMd;
    let permSet;
  
    return app.mutableData.newRandomPublic(15003)
      .then((md) => md.quickSetup(baseWallet))
      .then((md) => walletMd = md)
      .then(() => app.mutableData.newPermissionSet())
      .then((pmSet) => permSet = pmSet)
      .then(() => permSet.setAllow('Insert'))
      .then(() => walletMd.setUserPermissions(null, permSet, 1))
      .then(() => walletMd);
  };