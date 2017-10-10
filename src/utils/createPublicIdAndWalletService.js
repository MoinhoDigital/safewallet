export default async function(appHandle, publicNamesHandle, walletSerialised, publicId, walletId) {
	const encPublicId = await window.safeCrypto.sha3Hash(appHandle, publicId);

	const mdHandle = await window.safeMutableData.newPublic(appHandle, encPublicId, 15001);

	console.log('mdHandle:', mdHandle);
	await window.safeMutableData.quickSetup(mdHandle, { [walletId+'@email']: 'walletSerialised' },
                                                         'Public Id: '+publicId,
                                                         'Wallet Id: '+walletId);
	console.log('QUICK');
	const mutationHandle = await window.safeMutableData.newMutation(mdHandle);
	console.log('mutationHandle', mutationHandle);
	const encDataKey = await window.safeMutableData.encryptKey(publicNamesHandle, publicId)
	console.log('encDataKey', encDataKey);
	const encDataValue = await window.safeMutableData.encryptValue(publicNamesHandle, encPublicId);
	console.log('encDataValue', encDataValue);
	await window.safeMutableDataMutation.insert(mutationHandle, encDataKey, encDataValue);
	console.log('...');
	await window.safeMutableData.applyEntriesMutation(publicNamesHandle, mutationHandle);

	// app.mutableData.newPublic
	// quickSetup
	// app.mutableData.newMutation()
	// insertEncrypted(pubNamesMd, mut, serviceInfo.publicId, serviceInfo.serviceAddr)
	// pubNamesMd.applyEntriesMutation(mut);
	return ;
}