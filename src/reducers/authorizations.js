import { APP_INITIALIZE, APP_SESSION  } from '../actions';

export default function(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case APP_INITIALIZE:
      return {...state, ...{
        initializing: false,
        authorizing: true,
        appHandle: payload
      }};
    case APP_SESSION:
      return {...state, ...payload};
    default:
      return state;
    }
}
