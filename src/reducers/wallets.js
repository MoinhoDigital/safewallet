import { CREATE_WALLET } from '../actions';

export default function(state = [], action) {
  const { type, text, wallet } = action;

  switch (type) {
    case CREATE_WALLET:
      return [...state, {id: Math.random().toString(36).substring(2),
        text
      }];
    default:
      return state;
    }
}
