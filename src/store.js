import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const defaultState = {
	todos: []
};

const enhancers = compose(
	process.env.NODE_ENV !== 'production' ? window.devToolsExtension && window.devToolsExtension() : f => f
);

const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(rootReducer, defaultState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
