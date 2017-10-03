import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const defaultState = {
  authorizations: {
    initializing: true
  }
};

const enhancers = compose(
	process.env.NODE_ENV !== 'production' ? window.devToolsExtension && window.devToolsExtension() : f => f
);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(rootReducer, defaultState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
