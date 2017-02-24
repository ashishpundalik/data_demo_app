import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import HttpHelper from './services/HttpHelper.js';
import rootReducer from './reducers/indexReducer.js';
import routes from './routes.js';

require('./scss/main.scss');

let store;

let preloadImages = (images) => {
  for(let image of images) {
    require('./assets/retina_images/'+image.url);
  }
}

let renderApp = () => {
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById("app")
  );
}

let history;

let createReduxStore = (images) => {
  const START_INDEX = 0, END_INDEX = 5;
  let initialState = Object.assign({}, {
    rootState: {
      predictions: images.healthy.slice(START_INDEX, END_INDEX).
        concat(images.diseased.slice(START_INDEX, END_INDEX)),
      images,
      start_index: START_INDEX,
      end_index: END_INDEX,
      isPredicting: false
    }
  });
  store = createStore(combineReducers({
    rootState: rootReducer,
    routing: routerReducer
  }), initialState, applyMiddleware(thunk));
  history = syncHistoryWithStore(browserHistory, store);
}

let init = (response) => {
  let healthyImages = response.healthy;
  let diseasedImages = response.diseased;
  let allImages = healthyImages.concat(diseasedImages);
  preloadImages(allImages);
  createReduxStore(response);
  renderApp();
}

let fetchImageInfo = () => {
  require('./assets/bg-image.jpg');
  let promise = HttpHelper.get("http://localhost:8000/getImages", {});
  promise.then((response) => {
    init(response);
  }).catch((failure) => {
    console.log("Promise Failed: ", failure);
  });
}

fetchImageInfo();
