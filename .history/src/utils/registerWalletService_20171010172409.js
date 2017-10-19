import genNewAccount from './genNewAccount';

export default async function(appHandle, id, xorName) {
    try {
        const newAccount = await genNewAccount(appHandle, id);
        const serialised = await window.safeMutableData.serialise(newAccount.walletMd);
        const md = await window.safeMutableData.newPublic(appHandle, xorName, 15001);
        return newAccount;
    } catch(err) {
        console.log('Err registerwallet', err);
        return { err };
    }
}