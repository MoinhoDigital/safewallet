import { combineReducers } from 'redux';

import authorizations from './authorizations';
import wallets from './wallets';

export default combineReducers({ authorizations, wallets });
