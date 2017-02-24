import { connect } from 'react-redux';
import App from '../components/App.jsx';

let mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state.rootState);
}

let AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;
