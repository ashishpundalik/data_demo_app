import { connect } from 'react-redux';
import PredictionImage from '../components/PredictionImage.jsx';

let mapStateToProps = (state, ownProps) => {
  let { isPredicting } = state;
  let prediction = state.predictions[ownProps.index];
  let imgPath = `assets/retina_images/${prediction.url}`;
  let actual = prediction.actual;
  return Object.assign({}, {
    actual,
    isPredicting,
    predictedVal: '',
    imgPath
  });
}

let PredictionImageContainer = connect(mapStateToProps, null)(PredictionImage);

export default PredictionImageContainer;
