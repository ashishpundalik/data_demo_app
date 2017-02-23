import React, {Component} from 'react';

import HttpHelper from '../services/HttpHelper.js';
import appConstants from '../constants/appConstants.js';

import AppHeader from '../containers/AppHeaderContainer.js';
import Demo from '../containers/DemoContainer.js';
import DemoInformation from './DemoInformation.jsx';


require('../scss/dashboard.scss');

class Dashboard extends Component {
  render() {
    return (
      <section className = "dashboard-container">
        <AppHeader />
        <Demo />
      </section>
    )
  }
}

export default Dashboard
