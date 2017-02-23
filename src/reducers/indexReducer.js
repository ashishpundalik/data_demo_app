import { LOAD_IMAGES } from '../actions/LoadImagesAction.js';
import { PREDICT, predictImages } from '../actions/PredictImagesAction.js';

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

const loadImages = (state = {}, action) => {
  console.log("REDUCER", action.type);
  switch (action.type) {
    case LOAD_IMAGES:
      let { start_index, end_index } = getUpdatedIndices(state.images.healthy.length, state.images.diseased.length, state.start_index, state.end_index);
      let nextImages = getNextImages(start_index, end_index, state.images);
      let relevantState = Object.assign({}, {
        start_index,
        end_index,
        predictions: nextImages,
        images: state.images,
        isPredicting: false,
        predictingTextClass: 'predicted-text-hidden'
      });
      return relevantState;
    case PREDICT:
      return (dispatch) => {
        console.log("PREDICT DISPATCH");
        let params = {
          start_index: state.start_index,
          end_index: state.end_index,
          filter_choice: 'all'
        };
        let promise = HttpHelper.get("http://localhost:8000/prediction", params);
        promise.then((response) => {
          dispatch(predictImages(response));
        }).catch((err) => {
          console.log('Promise failed');
        });
        return promise;
      }
    default:
      return state;
  }
}

export default loadImages;
