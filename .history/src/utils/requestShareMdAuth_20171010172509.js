export default async function(appHandle, mdPermissions) {
	const perm = await window.safeApp.authoriseShareMd(appHandle, mdPermissions);
    console.log('authoriseShareMd:', perm);
    return null;
}
