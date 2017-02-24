import { connect } from 'react-redux';
import PredictionInfo from '../components/PredictionInfo.jsx';

let mapStateToProps = (state, ownProps) => {
  return {};
}

let PredictionInfoContainer = connect(mapStateToProps, null)(PredictionInfo);

export default PredictionInfoContainer;
