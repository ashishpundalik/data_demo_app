import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx'
import appConstants from './constants/appConstants.js';

import HttpHelper from './services/HttpHelper.js';

require('./scss/main.scss');

let preloadImages = (images) => {
  for(let image of images) {
    require('./assets/retina_images/'+image.url);
  }
  appConstants.images = images;
  render(
    <App />,
    document.getElementById("app")
  )
}

let fetchImageInfo = () => {
  let promise = HttpHelper.get("http://localhost:8000/getImages", {});
  promise.then((response) => {
    let images = response.slice(0, 20);
    preloadImages(images);
  }).catch((failure) => {
    console.log("Promise Failed: ", failure);
  });
}

fetchImageInfo();
