import HttpHelper from '../services/HttpHelper.js';
import { push } from 'react-router-redux';

export const LOAD_NEXT_IMAGES = 'LOAD_NEXT_IMAGES';
export const INTIAL_IMAGES_LOADED = 'INTIAL_IMAGES_LOADED';
export const LOAD_IMAGES = 'LOAD_IMAGES'

let fetchImageInfo = () => {
  require('../assets/bg-image.jpg');
  require('../assets/retina_images/normal.jpg');
  require('../assets/retina_images/affected.jpg');
  return HttpHelper.get('getImages', {});
}

let preloadImages = (images) => {
  for(let image of images) {
    require('../assets/retina_images/'+image.url);
  }
}

let init = (response) => {
  let healthyImages = response.healthy;
  let diseasedImages = response.diseased;
  let allImages = healthyImages.concat(diseasedImages);
  preloadImages(allImages);
  const START_INDEX = 0, END_INDEX = 5;
  let initialState = Object.assign({}, {
    predictions: healthyImages.slice(START_INDEX, END_INDEX).
      concat(diseasedImages.slice(START_INDEX, END_INDEX)),
    images: response,
    start_index: START_INDEX,
    end_index: END_INDEX,
    isPredicting: false,
    isLoadingImages: false
  });
  return initialState;
}

let loadImages = () => {
  return {
    type: LOAD_IMAGES
  }
}

export const loadNextImages = () => {
  return {
    type: LOAD_NEXT_IMAGES
  }
};

let initialImagesLoaded = (initialState) => {
  return {
    type: INTIAL_IMAGES_LOADED,
    initialState
  }
}

export const loadInitialImages = () => {
  return (dispatch, action) => {
    let promise = fetchImageInfo();
    dispatch(loadImages());
    promise.then((response) => {
      let initialState = init(response);
      dispatch(initialImagesLoaded(initialState));
      dispatch(push('/demo'));
    }).catch((failure) => {
      console.log('Promise Failed: ', failure);
    });
  }
}
