export const initialiseApp = async function (appId, appName, appVendor) {
    if(!window.safeApp) {
        return false;
    }
	const appInfo = {
		id: appId || 'net.safe.app.webclient.10',
		name: appName || 'Safe App',
		vendor: appVendor || 'Anonymous',
		scope: null
    };

    try {
        const appHandle = await window.safeApp.initialise(appInfo);
        return appHandle;
    } catch (err) {
        console.log(err);
    }

};

export const authorizeApp = async function(appHandle) {
    const authUri = await window.safeApp.authorise(
        appHandle,
        {
          _public: [
            'Read',
            'Insert',
            'Update',
            'Delete'
          ],
          _publicNames: [
            'Read',
            'Insert',
            'Update',
            'Delete'
          ]
        },
        {own_container: true}
    );
    return authUri;
};

const genServiceInfo = (app, emailId) => {
    let serviceInfo = splitPublicIdAndService(emailId);
    return app.crypto.sha3Hash(serviceInfo.publicId)
      .then((hashed) => {
        serviceInfo.serviceAddr = hashed;
        return serviceInfo;
      });
  }
  

export const setupAccount = async function (app, emailId) {
    let serviceInfo;
    // const container = await app.auth.getContainer(APP_INFO.containers.publicNames);
    // return genServiceInfo(app, emailId)
    //   .then((info) => serviceInfo = info)
    //   .then(() => app.auth.getContainer(APP_INFO.containers.publicNames))
    //   .then((pubNamesMd) => pubNamesMd.encryptKey(serviceInfo.publicId).then((key) => pubNamesMd.get(key))
    //     // If service container already exists, try to add email service
    //     .then((encryptedAddr) => pubNamesMd.decrypt(encryptedAddr.buf)
    //       .then((servicesXorName) => createEmailService(app, servicesXorName, serviceInfo))
    //     , (err) => { // ...if not then create it
    //       if (err.code !== SAFE_APP_ERROR_CODES.ERR_NO_SUCH_ENTRY) {
    //         throw err;
    //       }
    //       // The public ID doesn't exist in _publicNames
    //       return genNewAccount(app, serviceInfo.emailId)
    //         .then((newAccount) => newAccount.inboxMd.serialise()
    //           .then((inboxSerialised) => createPublicIdAndEmailService(app,
    //                               pubNamesMd, serviceInfo, inboxSerialised))
    //           .then(() => ({ newAccount }))
    //         )
    //     })
    //   );
  }
