import React, {Component} from 'react';

import HttpHelper from '../services/HttpHelper.js';
import appConstants from '../constants/appConstants.js';

import AppHeader from '../containers/AppHeaderContainer.js';


require('../scss/dashboard.scss');

class Dashboard extends Component {
  render() {
    return (
      <section className = 'dashboard-container'>
        <AppHeader />
        {this.props.children}
      </section>
    )
  }
}

export default Dashboard
