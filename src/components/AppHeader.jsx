import React, { Component } from 'react';
import { Link } from 'react-router';

require('../scss/appHeader.scss');

class AppHeader extends Component {
  constructor(props) {
    super(props);
    const INFO = '/info';
    const DEMO = '/demo';
    const BLOG = '/blog';
    this.getActiveInfoSectionElems = (path) => {
      let infoElems = [];
      if(path === DEMO) {
        let loadImagesBtn = <button disabled = {this.props.isPredicting}
          className = 'nav-btn' key = '1' onClick = {this.props.onLoadNextImages}>LOAD NEXT 10</button>;
        let predictBtn = <button disabled = {this.props.isPredicting}
          className = 'nav-btn' key = '2' onClick = {this.props.predict}>PREDICT</button>;
        infoElems = [loadImagesBtn, predictBtn];
      } else if( path === INFO || path === BLOG ) {
        let activityInfo = this.props.isLoadingImages ? 'Please wait as the images load' : '';
        let loadImagesBtn = <button onClick = {this.props.onLoadImages} key = '1' className = 'nav-btn'>LOAD IMAGES</button>;
        let activityInfoTextElem = <p key = '2' className = 'activity-info-text'>{activityInfo}</p>
        infoElems = [loadImagesBtn, activityInfoTextElem];
      }
      return infoElems;
    }
  }

  render() {
    let locationPath = this.props.locationBeforeTransitions.pathname;
    let infoElems = this.getActiveInfoSectionElems(locationPath);
    return (
      <nav className = 'app-header-container'>
        <header className = 'app-header'>
          <h1>Diabetic Retinopathy Diagnosis(DRD)</h1>
          <p>This page demos an automated method of Diabetic Retinopathy screening
            of fundus images of the eye. The images are classified as normal or affected using
            a deep neural network.
          </p>
          <Link className = 'blog-page-link' to = '/blog' activeStyle = {{color: 'red'}} >How does is work?</Link>
        </header>
        <section className = 'header-nav-btns-container'>
          {infoElems}
        </section>
      </nav>
    )
  }
}

//<p className = 'precision-text'><b>Precision: {this.state.precisionPercentage}</b></p>
export default AppHeader
