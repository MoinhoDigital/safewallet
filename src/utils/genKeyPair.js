export default app => {
	let rawKeyPair = {};
	return app.crypto.generateEncKeyPair().then(keyPair =>
		keyPair.pubEncKey
			.getRaw()
			.then(rawPubEncKey => {
				rawKeyPair.publicKey = rawPubEncKey.buffer.toString('hex');
				return;
			})
			.then(() => keyPair.secEncKey.getRaw())
			.then(rawSecEncKey => {
				rawKeyPair.privateKey = rawSecEncKey.buffer.toString('hex');
				return rawKeyPair;
			})
	);
};
