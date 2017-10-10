import genKeyPair from './genKeyPair';
import createWallet from './createWallet';

export default async function(appHandle, id) {
    const keyPair = await genKeyPair(appHandle);
    const walletMd = await createWallet(appHandle, keyPair);
	return {
		id,
		walletMd,
		encSk: keyPair.privateKey,
		encPk: keyPair.publicKey
	};
}
