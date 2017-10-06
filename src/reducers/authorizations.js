import { APP_INITIALIZE, APP_AUTHORIZE  } from '../actions';

export default function(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case APP_INITIALIZE:
      return {...state, ...{
        initializing: false,
        authorizing: true,
        appHandle: payload
      }};
    case APP_AUTHORIZE:
      return {...state,
        authorizing: false,
        appHandle: payload.appHandle,
        authUri: payload.authUri
      };
    default:
      return state;
    }
}
