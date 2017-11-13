export default async function (app) {
  const keyPairHandle = await window.safeCrypto.generateEncKeyPair(app)
  const pubEncKey = await window.safeCryptoKeyPair.getPubEncKey(keyPairHandle)
  const secEncKey = await window.safeCryptoKeyPair.getSecEncKey(keyPairHandle)
  const rawPubEncKey = await window.safeCryptoPubEncKey.getRaw(pubEncKey)
  const rawSecEncKey = await window.safeCryptoSecEncKey.getRaw(secEncKey)
  return {
    publicKey: rawPubEncKey.buffer.toString('hex'),
    privateKey: rawSecEncKey.buffer.toString('hex')
  }
}
