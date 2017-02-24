import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard.jsx';

let mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state.rootState);
}

let DashboardContainer = connect(mapStateToProps, null)(Dashboard);

export default DashboardContainer;
