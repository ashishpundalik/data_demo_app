import React, { Component } from 'react';

require('../scss/appHeader.scss');

class AppHeader extends Component {
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
          <button disabled = {this.props.isPredicting} className = "nav-btn" onClick = {this.props.onLoadImages}>LOAD NEXT 10</button>
          <button disabled = {this.props.isPredicting} className = "nav-btn" onClick = {this.props.predict}>PREDICT</button>
        </section>
      </nav>
    )
  }
}

//<p className = "precision-text"><b>Precision: {this.state.precisionPercentage}</b></p>
export default AppHeader
