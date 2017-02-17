import React, { Component } from 'react';

require('../scss/predictionFigure.scss');

class PredictionImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictedVal: this.props.predicted
    };
  }

  componentWillReceiveProps() {
    console.log("Props Updated: ", this.props.predicted);
    this.setState({
      predictedVal: this.props.predicted
    })
  }

  render() {
    let props = this.props;
    return (
      <figure className = 'predictions-img-figure align-vertical-center'>
        <img key = {props.index} className = 'retina-img-prediction' src = {props.imgPath}/>
        <figcaption className = "predictions-img-info">
          <p className = "actual-text predictions-info-text"><b>Actual: {props.actualVal}</b></p>
          <p className = "predicted-text predictions-info-text"><b>Predicted: <span className = 'blink_me'>{this.state.predictedVal}</span></b></p>
        </figcaption>
      </figure>
    )
  }
}

export default PredictionImage;
