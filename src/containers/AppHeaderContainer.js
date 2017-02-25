import { connect } from 'react-redux';
import { loadNextImages, loadInitialImages } from '../actions/LoadImagesAction.js';
import { predictImages } from '../actions/PredictImagesAction.js';
import AppHeader from '../components/AppHeader.jsx';

let mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state.rootState, {
    locationBeforeTransitions: state.routing.locationBeforeTransitions
  });
}

let mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadNextImages: () => {
      dispatch(loadNextImages());
    },

    predict: () => {
      dispatch(predictImages());
    },

    onLoadImages: () => {
      dispatch(loadInitialImages())
    }
  }
}

let AppHeaderContainer  = connect(mapStateToProps, mapDispatchToProps)(AppHeader);

export default AppHeaderContainer;
