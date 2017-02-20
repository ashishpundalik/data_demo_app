import React, { Component } from 'react';

require('../scss/predictionFigure.scss');

class PredictionImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictedVal: this.props.predicted,
      predictedTextClass: 'predicted-text-hidden',
      blinkClass: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    let newState;
    if(nextProps.predicted !== this.props.predicted) {
      newState = {
        predictedVal: nextProps.predicted,
        predictedTextClass: nextProps.predictedTextClass,
        blinkClass: nextProps.blinkClass
      }
    } else {
      newState = {
        predictedTextClass: nextProps.predictedTextClass,
        blinkClass: nextProps.blinkClass
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
        predictedVal = "NORMAL";
      } else {
        predictedVal = "DISEASED";
      }
    }
    return (
      <figure className = 'predictions-img-figure align-vertical-center'>
        <img key = {props.index} className = 'retina-img-prediction' src = {props.imgPath}/>
        <figcaption className = "predictions-img-info">
          <p className = "predictions-info-text"><b className = {this.state.predictedTextClass}><span className = {this.state.blinkClass}>{predictedVal}</span></b></p>
        </figcaption>
      </figure>
    )
  }
}

export default PredictionImage;
