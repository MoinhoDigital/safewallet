import { CREATE_WALLET } from './';

export function createWallet(text) {
	return {
		type: CREATE_WALLET,
		text
	};
}