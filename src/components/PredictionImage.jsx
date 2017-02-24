import React, { Component } from 'react';

require('../scss/predictionFigure.scss');

class PredictionImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    let predicted = this.props.predictedVal;
    let predictingTextClass = (this.props.isPredictionComplete || this.props.isPredicting)
      ? 'predicted-text' : 'predicted-text-hidden';
    let blinkClass = this.props.isPredicting ? 'blink-me' : '';
    let imageClass = (this.props.actual === 1 ? "retina-img-diseased" : "retina-img-normal")
      + ' retina-img-prediction';
    let predictedVal = "predicting...";
    if(predicted === 0) {
      predictedVal = "WITHOUT DISEASE";
    } else if(predicted === 1) {
      predictedVal = "WITH DISEASE";
    }
    return (
      <figure className = 'predictions-img-figure align-vertical-center'>
        <img key = {props.index} className = {imageClass} src = {props.imgPath}/>
        <figcaption className = "predictions-img-info">
          <p className = "predictions-info-text"><b className = {predictingTextClass}><span className = {blinkClass}>{predictedVal}</span></b></p>
        </figcaption>
      </figure>
    )
  }
}

export default PredictionImage;
