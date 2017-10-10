import { CREATE_WALLET } from '../actions';

export default function(state = [], action) {
  const { type, text, wallet } = action;

  switch (type) {
    case CREATE_WALLET:
      return [...state, { ...action.payload }];
    default:
      return state;
    }
}
