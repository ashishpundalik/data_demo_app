import React, { Component } from 'react';
import HttpHelper from '../services/HttpHelper.js';
import PredictionImage from './PredictionImage.jsx';

require('../scss/demo.scss');

class Demo extends Component {
  constructor(props) {
    super(props);
    this.IMAGE_TYPE = "healthy";
    this.IMAGE_NOS = 10;
    let images = this.props.images[this.IMAGE_TYPE].slice(0,this.IMAGE_NOS);
    this.state = {
      predictions: images,
      isPredicting: false,
      predictingTextClass: 'predicted-text-hidden'
    }
    this.onLoadPredictionsClicked = this.onLoadPredictionsClicked.bind(this);
    this.onImageTypeChanged = this.onImageTypeChanged.bind(this);
  }

  onLoadPredictionsClicked() {
    let params = {
      start_index: 0,
      end_index: 20,
      filter_choice: this.IMAGE_TYPE
    };
    let promise = HttpHelper.get('http://localhost:8000/predictions', params);
    this.setState({
      isPredicting: true,
      predictingTextClass: 'predicted-text'
    });
    promise.then((response) => {
      let images = this.props.images[this.IMAGE_TYPE].slice(0,this.IMAGE_NOS);
      let tranformedPredictions = this.transformPredictions(response, images);
      this.setState({
        predictions: tranformedPredictions,
        isPredicting: false,
        predictingTextClass: 'predicted-text'
      });
    }).catch((failure) => {
      this.setState({
        isPredicting: false,
        predictingTextClass: 'predicted-text-hidden'
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

  onImageTypeChanged(event) {
    this.IMAGE_TYPE = event.target.value;
    let images = this.props.images[this.IMAGE_TYPE].slice(0,this.IMAGE_NOS);
    this.setState({
      predictions: images,
      predictingTextClass: 'predicted-text-hidden',
      isPredicting: false
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
        predictedTextClass: this.state.predictingTextClass,
        blinkClass: this.state.isPredicting ? 'blink-me' : ''
      };
      return <PredictionImage {...props} />
    });
    return (
      <section className = 'app-view app-demo-container'>
        <h1>Diabetic Retinopathy Detection(DRD)</h1>
        <section className = 'retinopathy-images-table'>
          <div className = 'images-grid-header'>
            <button className = "image-grid-header-row" onClick = {this.onLoadPredictionsClicked}>PREDICT</button>
            <select className = 'image-grid-header-row' onChange = {this.onImageTypeChanged}>
              <option value = 'healthy'>HEALTHY</option>
              <option value = 'diseased'>DISEASED</option>
            </select>
          </div>
          <div className = "retinopathy-images-grid-container">
            {ImageElem}
          </div>
        </section>
      </section>
    );
  }
}

export default Demo;
