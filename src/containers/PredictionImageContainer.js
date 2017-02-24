import { connect } from 'react-redux';
import PredictionImage from '../components/PredictionImage.jsx';

let mapStateToProps = (state, ownProps) => {
  let { isPredicting, isPredictionComplete } = state;
  let prediction = state.predictions[ownProps.index];
  let imgPath = `assets/retina_images/${prediction.url}`;
  let actual = prediction.actual;
  let predictedVal = (prediction.predicted !== undefined ||
    prediction.predicted !== null || prediction.predicted !== '') ? prediction.predicted : '';
  return Object.assign({}, {
    actual,
    isPredicting,
    predictedVal,
    imgPath,
    isPredictionComplete
  });
}

let PredictionImageContainer = connect(mapStateToProps, null)(PredictionImage);

export default PredictionImageContainer;
