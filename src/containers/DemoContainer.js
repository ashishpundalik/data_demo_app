import { connect } from 'react-redux';
import Demo from '../components/Demo.jsx';

let mapStateToProps = (state, ownProps) => {
  let { isPredicting, predictions } = state.rootState;
  return Object.assign({}, {
    predictions,
    isPredicting
  });
}

let DemoContainer = connect(mapStateToProps, null)(Demo);

export default DemoContainer;
