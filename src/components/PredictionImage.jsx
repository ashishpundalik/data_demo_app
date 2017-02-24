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
    if(actual === 0) {
      actualVal = "WITHOUT DISEASE";
    } else if(actual === 1) {
      actualVal = "WITH DISEASE";
    }
    return (
      <figure className = 'predictions-img-figure align-vertical-center'>
        <img key = {props.index} className = {imageClass} src = {props.imgPath}/>
        <figcaption className = "predictions-img-info">
          <p className = "predictions-info-text"><b className = 'predicted-text'><span>{actualVal}</span></b></p>
        </figcaption>
      </figure>
    )
  }
}

export default PredictionImage;
