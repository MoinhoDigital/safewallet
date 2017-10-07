import genKeyPair from './genKeyPair';
import createWallet from './createWallet';

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
    const session = await window.safeApp.connectAuthorised(appHandle, authUri);
    console.log('Created authorized session with new appHandle: ', session);
    return {
        appHandle: session,
        authUri
    };
};

const genServiceInfo = (app, emailId) => {
    // let serviceInfo = splitPublicIdAndService(emailId);
    // return app.crypto.sha3Hash(serviceInfo.publicId)
    //   .then((hashed) => {
    //     serviceInfo.serviceAddr = hashed;
    //     return serviceInfo;
    //   });
  };
  

export const setupAccount = async function (app, publicId) {
    console.log('setting up with: ', app, publicId);
    // Check if app has persmission to access _publicNames to Read
    const test = await window.safeApp.authoriseContainer(app, { _publicNames: ['Read'] });
    console.log('test: ', test);
    const hasPermission = await window.safeApp.canAccessContainer(app, '_publicNames', ['Read']);
    // If we have permission...
    console.log('persmission', hasPermission);
    if(hasPermission) {
        // Get publicNames container
        const container = await window.safeApp.getContainer(app, '_publicNames');
        console.log('Container obj: ', container);
        // Get user publicId
        const encPubId = await container.encryptKey(publicId);
        const publicName = await container.get(encPubId);
        console.log('Keys', encPubId, publicName);
        try {
            const xorName = await container.decrypt(publicName.buf);
            console.log('Xor', xorName);
            const appSignKey = await app.crypto.getAppPubSignKey();
            const md = await app.mutableData.newPublic(xorName, 15003);
            const userPermission = await md.getUserPermissions(appSignKey);
            const keyPair = await genKeyPair(app);
            // Create Wallet
            const walletMd = createWallet(keyPair.publicKey);
            return walletMd;
        }
        catch(err) {
            console.log('Errror', err);
            if(err.code !== -106) {
                console.log('Some error');
            } else {
                // Generate new wallet for publicId
                console.log('Doesnt have Start generating wallet.');
            }
        }
    }

    // const emailService = {
    //     servicesXorName,
    //     emailId: serviceInfo.emailId,
    //     serviceName: serviceInfo.serviceName
    //   };
    
    //   return app.crypto.getAppPubSignKey()
    //     .then((appSignKey) => app.mutableData.newPublic(servicesXorName, CONSTANTS.TAG_TYPE_DNS)
    //       .then((md) => md.getUserPermissions(appSignKey)) // FIXME: the permissions it has could not be enough
    //       .then(() => registerEmailService(app, emailService).then((newAccount) => ({ newAccount }))
    //         , (err) => requestShareMdAuth(app,
    //             [{ type_tag: CONSTANTS.TAG_TYPE_DNS,
    //                name: servicesXorName,
    //                perms: ['Insert']
    //              }] )
    //           .then(() => emailService)
    //       ));
    //

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
  };
