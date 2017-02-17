import React, { Component } from 'react';
import HttpHelper from '../services/HttpHelper.js';
import PredictionImage from './PredictionImage.jsx';

require('../scss/demo.scss');

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: this.props.images
    }
    this.onLoadPredictionsClicked = this.onLoadPredictionsClicked.bind(this);
  }

  onLoadPredictionsClicked() {
    let params = {
      start_index: 0,
      end_index: 20,
      filter_choice: 'all'
    };
    let promise = HttpHelper.get('http://localhost:8000/predictions', params);
    promise.then((response) => {
      let tranformedPredictions = this.transformPredictions(response, this.props.images);
      console.log(tranformedPredictions);
      this.setState({
        predictions: tranformedPredictions
      });
      console.log('Predictions: ', tranformedPredictions);
    }).catch((failure) => {
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
      console.log((val.predicted !== null && val.predicted !== undefined) ? val.predicted : 'processing...');
      let props = {
        key: index,
        index,
        actualVal: val.actual,
        imgPath,
        predicted: (val.predicted !== null && val.predicted !== undefined) ? val.predicted : 'processing...'
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
