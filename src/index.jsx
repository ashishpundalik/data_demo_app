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
}

let init = (response) => {
  let healthyImages = response.healthy;
  let diseasedImages = response.diseased;
  let images = healthyImages.concat(diseasedImages);
  preloadImages(images);
  appConstants.images = response;
  render(
    <App />,
    document.getElementById("app")
  )
}

let fetchImageInfo = () => {
  require('./assets/bg-image.jpg');
  let promise = HttpHelper.get("http://localhost:8000/getImages", {});
  promise.then((response) => {
    console.log(response);
    init(response);
  }).catch((failure) => {
    console.log("Promise Failed: ", failure);
  });
}

fetchImageInfo();
