import React, { Component } from 'react';

require('../scss/info.scss');

class PredictionInfo extends Component {
  render() {
    return (
      <section className = 'app-view prediction-info-container'>
        <div className = 'prediction-info-content-container'>
          <div className = 'prediction-info-content'>
            <div className = 'info-img-container'>
              <img src = 'assets/retina_images/10154_right.jpeg' className = "retina-img-correctly-predicted" />
              <p>WITHOUT DISEASE</p>
            </div>
            <p className = 'info-text'>Correct Prediction of a with disease retina</p>
          </div>
          <div className = 'prediction-info-content'>
            <div className = 'info-img-container'>
              <img src = 'assets/retina_images/10154_right.jpeg' className = "retina-img-incorrectly-predicted" />
              <p className = "diseased-text">WITH DISEASE</p>
            </div>
            <p className = 'info-text'>Wrong Prediction of an affected retina</p>
          </div>
        </div>
      </section>
    )
  }
}

export default PredictionInfo;
