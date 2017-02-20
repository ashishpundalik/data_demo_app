import React, { Component } from 'react';
import HttpHelper from '../services/HttpHelper.js';
import PredictionImage from './PredictionImage.jsx';
import appConstants from '../constants/appConstants.js';

require('../scss/demo.scss');

class Demo extends Component {
  constructor(props) {
    super(props);
    console.log("In Demo");
    this.IMAGE_TYPE_HEALTHY = "healthy";
    this.IMAGE_TYPE_DISEASED = "diseased";
    const IMAGE_NOS = 5;
    let healthyImages = this.props.images[this.IMAGE_TYPE_HEALTHY].slice(0,IMAGE_NOS);
    let diseasedImages = this.props.images[this.IMAGE_TYPE_DISEASED].slice(0,IMAGE_NOS);
    let images = healthyImages.concat(diseasedImages);
    this.state = {
      predictions: images,
      isPredicting: false,
      predictingTextClass: 'predicted-text-hidden'
    }
    this.onLoadPredictionsClicked = this.onLoadPredictionsClicked.bind(this);
    this.onLoadNextImagesClicked = this.onLoadNextImagesClicked.bind(this);
  }

  onLoadPredictionsClicked() {
    let params = {
      start_index: appConstants.image_start_index,
      end_index: appConstants.image_end_index,
      filter_choice: 'all'
    };
    let promise = HttpHelper.get('http://localhost:8000/predictions', params);
    this.setState({
      isPredicting: true,
      predictingTextClass: 'predicted-text'
    });
    promise.then((response) => {
      let tranformedPredictions = this.transformPredictions(response);
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

  transformPredictions(predictions) {
    return predictions.map((val, index) => {
      return {
        url: val.img_url.replace('retina/retina_images/', ''),
        actual: val.actual,
        predicted: val.predicted
      }
    });
  }

  onLoadNextImagesClicked() {
    let healthyImagesAll = this.props.images[this.IMAGE_TYPE_HEALTHY];
    let diseasedImagesAll = this.props.images[this.IMAGE_TYPE_DISEASED];
    if(healthyImagesAll.length === appConstants.image_end_index || diseasedImagesAll.length === appConstants.image_end_index) {
      appConstants.image_start_index = 0;
      appConstants.image_end_index = 5;
    }
    let start_index = appConstants.image_start_index + 5;
    let end_index = appConstants.image_end_index + 5;
    let healthyImages = this.props.images[this.IMAGE_TYPE_HEALTHY].slice(start_index,end_index);
    let diseasedImages = this.props.images[this.IMAGE_TYPE_DISEASED].slice(start_index,end_index);
    let images = healthyImages.concat(diseasedImages);
    appConstants.image_start_index = start_index;
    appConstants.image_end_index = end_index;
    this.setState({
      predictions: images,
      isPredicting: false,
      predictingTextClass: 'predicted-text-hidden'
    })
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
            <button className = "image-grid-header-row" onClick = {this.onLoadNextImagesClicked}>LOAD NEXT 10</button>
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
