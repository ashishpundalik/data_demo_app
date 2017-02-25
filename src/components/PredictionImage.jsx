import React, { Component } from 'react';

require('../scss/predictionFigure.scss');

class PredictionImage extends Component {
  constructor(props) {
    super(props);
    this.getImageHighlight = () => {
      let { actual, predictedVal } = this.props;
      if(predictedVal !== undefined && predictedVal !== null && predictedVal !== '') {
        if(actual !== predictedVal) {
          return 'retina-img-prediction retina-img-incorrectly-predicted';
        }
        return 'retina-img-prediction retina-img-correctly-predicted';
      }
      return 'retina-img-prediction';
    }
  }

  render() {
    let props = this.props;
    let actual = this.props.actual;
    let imageClass = this.getImageHighlight();
    let actualVal = '';
    let overlayClass = this.props.isPredicting ? 'loading-overlay' : 'loading-overlay-hidden';
    let predictedTextClass = (actual === 0 ? 'predicted-text' : 'predicted-text diseased-text');
    if(actual === 0) {
      actualVal = 'WITHOUT DISEASE';
    } else if(actual === 1) {
      actualVal = 'WITH DISEASE';
    }
    return (
      <figure className = 'predictions-img-figure align-vertical-center'>
        <div className = {overlayClass}>
          <div className = 'loading-overlay-img'></div>
          <p>Predicting...</p>
        </div>
        <img key = {props.index} className = {imageClass} src = {props.imgPath}/>
        <figcaption className = 'predictions-img-info'>
          <p className = 'predictions-info-text'><b className = {predictedTextClass}><span>{actualVal}</span></b></p>
        </figcaption>
      </figure>
    )
  }
}

export default PredictionImage;
