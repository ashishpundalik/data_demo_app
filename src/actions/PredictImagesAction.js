import HttpHelper from '../services/HttpHelper.js';

export const PREDICT = 'PREDICT';

export const predict = () => {
  return {
    type: PREDICT
  }
}

export const PREDICTION_COMPLETE = 'PREDICTION_COMPLETE';

export const predictionComplete = (predictionResponse) => {
  return {
    type: PREDICTION_COMPLETE,
    predictionResponse
  }
}

export const predictImages = () => {
  return (dispatch, getState) => {
      let state = getState().rootState;
      let params = {
        start_index: state.start_index,
        end_index: state.end_index,
        filter_choice: 'all'
      };
      dispatch(predict());
      return HttpHelper.get('http://localhost:8000/predictions', params)
        .then((response) => {
          dispatch(predictionComplete(response));
        }).catch((err) => {
          console.log('Promise Failed');
        })
  }
}
