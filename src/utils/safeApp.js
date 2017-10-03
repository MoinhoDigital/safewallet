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
