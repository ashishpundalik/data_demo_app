import { connect } from 'react-redux';
import { loadImages } from '../actions/LoadImagesAction.js';
import { predictImages } from '../actions/PredictImagesAction.js';
import AppHeader from '../components/AppHeader.jsx';

let mapStateToProps = (state, ownProps) => {
  return state;
}

let mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadImages: () => {
      dispatch(loadImages());
    },
    predict: () => {
      dispatch(predictImages());
    }
  }
}

let AppHeaderContainer  = connect(mapStateToProps, mapDispatchToProps)(AppHeader);

export default AppHeaderContainer;
