import React, {Component} from 'react';
import AppHeader from './AppHeader.jsx';
import appConstants from '../constants/appConstants.js';
import Demo from './Demo.jsx';
import DemoInformation from './DemoInformation.jsx';


require('../scss/dashboard.scss');

class Dashboard extends Component {
  constructor() {
    super();
    this.onViewChange = this.onViewChange.bind(this);
    this.state = {
      currentView: Demo
    };
  }

  onViewChange(currentView) {
    let currentViewClass;
    if(currentView === appConstants.DEMO) {
      currentViewClass = Demo;
    } else {
      currentViewClass = DemoInformation;
    }
    this.setState({
      currentView: currentViewClass
    });
  }

  render() {
    let CurrentView = this.state.currentView;
    let props = {
      images: appConstants.images
    }
    return (
      <section className = "dashboard-container">
        <AppHeader onViewChange = {this.onViewChange} />
        <CurrentView {...props} />
      </section>
    )
  }
}

export default Dashboard
