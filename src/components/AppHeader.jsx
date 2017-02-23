import React, { Component } from 'react';

require('../scss/appHeader.scss');

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      precisionPercentage: ''
    };
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      precisionPercentage: (nextProps.precisionPercentage !== undefined) ?
        nextProps.precisionPercentage + "%" : ''
    });
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
          <button className = "nav-btn" onClick = {this.props.onLoadImages}>LOAD NEXT 10</button>
          <button className = "nav-btn" onClick = {this.props.predict}>PREDICT</button>
          <p className = "precision-text"><b>Precision: {this.state.precisionPercentage}</b></p>
        </section>
      </nav>
    )
  }
}

export default AppHeader
