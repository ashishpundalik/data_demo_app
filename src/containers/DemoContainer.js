import { connect } from 'react-redux';
import Demo from '../components/Demo.jsx';

let mapStateToProps = (state, ownProps) => {
  let { isPredicting } = state;
  return Object.assign({}, {
    predictions: state.predictions,
    isPredicting
  });
}

let DemoContainer = connect(mapStateToProps, null)(Demo);

export default DemoContainer;
