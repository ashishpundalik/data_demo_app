import { LOAD_IMAGES, LOAD_NEXT_IMAGES, INTIAL_IMAGES_LOADED } from '../actions/LoadImagesAction.js';
import { PREDICT, PREDICTION_COMPLETE } from '../actions/PredictImagesAction.js';

let getNextImages = (start_index, end_index, images) => {
  let healthyImages = images.healthy.slice(start_index, end_index);
  let diseasedImages = images.diseased.slice(start_index, end_index);
  return healthyImages.concat(diseasedImages);
};

let getUpdatedIndices = (healthyImagesCount, diseasedImagesCount, initialStartIndex, intialEndIndex) => {
  let start_index, end_index;
  if(healthyImagesCount === initialStartIndex || diseasedImagesCount === intialEndIndex) {
    start_index = 0;
    end_index = 5;
  } else {
    start_index = initialStartIndex + 5;
    end_index = intialEndIndex + 5;
  }
  return {
    start_index,
    end_index
  }
}

let transformPredictions = (predictions) => {
  let transformedPredictions = predictions.map((prediction) => {
    let { actual, predicted } = prediction;
    return {
      actual,
      predicted,
      url: prediction.img_url.replace('retina/retina_images', '')
    }
  });
  return transformedPredictions;
}

const loadImages = (state = {}, action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      return Object.assign({}, state, {
        isLoadingImages: true
      });
    case INTIAL_IMAGES_LOADED:
      return Object.assign({}, action.initialState, {
        isLoadingImages: false
      });
    case LOAD_NEXT_IMAGES:
      let { start_index, end_index } = getUpdatedIndices(state.images.healthy.length, state.images.diseased.length, state.start_index, state.end_index);
      let nextImages = getNextImages(start_index, end_index, state.images);
      let relevantState = Object.assign({}, {
        start_index,
        end_index,
        predictions: nextImages,
        images: state.images,
        isPredicting: false
      });
      return relevantState;
    case PREDICT:
      return Object.assign({}, state, {
        isPredicting: true
      });
    case PREDICTION_COMPLETE:
      return Object.assign({}, state, {
        predictions: transformPredictions(action.predictionResponse.predictions),
        precision: action.predictionResponse.precision,
        recall: action.predictionResponse.recall,
        isPredicting: false
      });
    default:
      return state;
  }
}

export default loadImages;
