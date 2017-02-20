import React, { Component } from 'react';

require('../scss/appHeader.scss');

class AppHeader extends Component {
  constructor() {
    super();
    this.resetClassName = (classNameVal, elems) => {
      for(let elem of elems) {
        elem.className = classNameVal;
      }
    };

    this.onNavBtnClicked = (event) => {
      event.stopPropagation();
      this.props.onViewChange(view);
    }
  }

  render() {
    return (
      <nav className = "app-header-container">
        <header className = "app-header">
          <h1>Diabetic Retinopathy Diagnosis(DRD)</h1>
          <p>This page demos an automated method of Diabetic Retinopathy screening
            of fundus images of the eye. The images are classified as normal or affected using
            a deep neural network.
          </p>
        </header>
        <section className = "header-nav-btns-container">
          <button className = "nav-btn" onClick = {this.onNavBtnClicked}>LOAD NEXT 10</button>
          <button className = "nav-btn" onClick = {this.onNavBtnClicked}>PREDICT</button>
        </section>
      </nav>
    )
  }
}

export default AppHeader
