import React, { Component } from 'react';
import HttpHelper from '../services/HttpHelper.js';
import PredictionImage from './PredictionImage.jsx';

require('../scss/demo.scss');

class Demo extends Component {
  constructor(props) {
    super(props);
    this.IMAGE_TYPE = "healthy";
    let images = this.props.images[this.IMAGE_TYPE].slice(0,2);
    this.state = {
      predictions: images,
      isPredicting: false
    }
    this.onLoadPredictionsClicked = this.onLoadPredictionsClicked.bind(this);
  }

  onLoadPredictionsClicked() {
    let params = {
      start_index: 0,
      end_index: 20,
      filter_choice: this.IMAGE_TYPE
    };
    let promise = HttpHelper.get('http://localhost:8000/predictions', params);
    this.setState({
      isPredicting: true
    });
    promise.then((response) => {
      let images = this.props.images[this.IMAGE_TYPE].slice(0,2);
      let tranformedPredictions = this.transformPredictions(response, images);
      this.setState({
        predictions: tranformedPredictions,
        isPredicting: false
      });
    }).catch((failure) => {
      this.setState({
        isPredicting: false
      });
      console.log('Promise Failed: ', failure);
    });
  }

  transformPredictions(predictions, images) {
    return images.map((val, index) => {
      return {
        url: val.url,
        actual: val.actual,
        predicted: predictions[index].predicted
      }
    });
  }

  render() {
    let ImageElem = this.state.predictions.map((val, index) => {
      let imgPath = `assets/retina_images/${val.url}`;
      let props = {
        key: index,
        index,
        actualVal: val.actual,
        imgPath,
        predicted: (val.predicted !== null && val.predicted !== undefined) ? val.predicted : 'processing...',
        predictingTextClass: this.state.isPredicting ? 'predicted-text' : 'predicted-text-hidden',
        blinkClass: this.state.isPredicting ? 'blink-me' : ''
      };
      return <PredictionImage {...props} />
    });
    return (
      <section className = 'app-view'>
        <h1>DEMO</h1>
        <button onClick = {this.onLoadPredictionsClicked}>LOAD</button>
        {ImageElem}
      </section>
    );
  }
}

export default Demo;
