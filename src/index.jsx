import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import HttpHelper from './services/HttpHelper.js';
import rootReducer from './reducers/indexReducer.js';
import routes from './routes.js';

require('./scss/main.scss');

let store, history;

let renderApp = () => {
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
}

let createReduxStore = () => {
  const middleware = routerMiddleware(browserHistory);
  store = createStore(combineReducers({
    rootState: rootReducer,
    routing: routerReducer
  }), {}, applyMiddleware(middleware, thunk));
  history = syncHistoryWithStore(browserHistory, store);
}

let init = () => {
  createReduxStore();
  renderApp();
}

init();
