import React, { Component } from 'react';

require('../scss/predictionFigure.scss');

class PredictionImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictedVal: this.props.predicted,
      predictedTextClass: 'predicted-text-hidden',
      blinkClass: '',
      imageBorderClass: this.props.imageBorderClass+' retina-img-prediction'
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let newState, blinkClass;
    if(nextProps.predicted !== this.props.predicted) {
      if(nextProps.predicted !== nextProps.actualVal) {
        blinkClass = 'incorrect-prediction-text';
      } else {
        blinkClass = nextProps.blinkClass;
      }
      newState = {
        predictedVal: nextProps.predicted,
        predictedTextClass: nextProps.predictedTextClass,
        blinkClass: blinkClass,
        imageBorderClass: nextProps.imageBorderClass+' retina-img-prediction'
      }
    } else {
      newState = {
        predictedTextClass: nextProps.predictedTextClass,
        blinkClass: nextProps.blinkClass,
        imageBorderClass: nextProps.imageBorderClass+' retina-img-prediction'
      }
    }
    this.setState(newState);
  }

  render() {
    let props = this.props;
    let predicted = this.state.predictedVal;
    let predictedVal = 'processing...';
    if(predicted !== 'processing...') {
      if(predicted === 0) {
        predictedVal = "WITHOUT DISEASE";
      } else {
        predictedVal = "WITH DISEASE";
      }
    }
    return (
      <figure className = 'predictions-img-figure align-vertical-center'>
        <img key = {props.index} className = {this.state.imageBorderClass} src = {props.imgPath}/>
        <figcaption className = "predictions-img-info">
          <p className = "predictions-info-text"><b className = {this.state.predictedTextClass}><span className = {this.state.blinkClass}>{predictedVal}</span></b></p>
        </figcaption>
      </figure>
    )
  }
}

export default PredictionImage;
