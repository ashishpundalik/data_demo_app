import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import HttpHelper from './services/HttpHelper.js';
import rootReducer from './reducers/indexReducer.js';
import App from './components/App.jsx';
// import appConstants from './constants/appConstants.js';

require('./scss/main.scss');

let store;

let preloadImages = (images) => {
  for(let image of images) {
    require('./assets/retina_images/'+image.url);
  }
}

let renderApp = () => {
  render(
    <Provider store = { store }>
      <App />
    </Provider>,
    document.getElementById("app")
  );
}

let createReduxStore = (images) => {
  const START_INDEX = 0, END_INDEX = 5;
  let initialState = Object.assign({}, {
    predictions: images.healthy.slice(START_INDEX, END_INDEX).
      concat(images.diseased.slice(START_INDEX, END_INDEX)),
    images,
    start_index: START_INDEX,
    end_index: END_INDEX,
    isPredicting: false
  });
  console.log("Root reducer ", rootReducer);
  store = createStore(rootReducer, initialState, applyMiddleware(thunk));
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
