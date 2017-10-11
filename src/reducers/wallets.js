import { CREATE_WALLET, GET_WALLET_IDS } from '../actions';

export default function(state = [], action) {
  const { type, text, wallet } = action;

  switch (type) {
    case CREATE_WALLET:
      return [...state, { ...action.payload }];
    case GET_WALLET_IDS:
      return [...state, { ...action.payload }];
    default:
      return state;
    }
}
