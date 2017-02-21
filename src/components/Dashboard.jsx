import React, {Component} from 'react';

import HttpHelper from '../services/HttpHelper.js';
import appConstants from '../constants/appConstants.js';

import AppHeader from './AppHeader.jsx';
import Demo from './Demo.jsx';
import DemoInformation from './DemoInformation.jsx';


require('../scss/dashboard.scss');

class Dashboard extends Component {
  constructor() {
    super();
    this.init()
    this.onViewChange = this.onViewChange.bind(this);
    this.onLoadPredictions = this.onLoadPredictions.bind(this);
    this.onLoadImages = this.onLoadImages.bind(this);
  }

  init() {
    this.AllImages = appConstants.images;
    this.IMAGE_TYPE_HEALTHY = "healthy";
    this.IMAGE_TYPE_DISEASED = "diseased";
    const IMAGE_NOS = 5;
    let healthyImages = this.AllImages[this.IMAGE_TYPE_HEALTHY].slice(0,IMAGE_NOS);
    let diseasedImages = this.AllImages[this.IMAGE_TYPE_DISEASED].slice(0,IMAGE_NOS);
    let images = healthyImages.concat(diseasedImages);
    this.state = {
      currentView: Demo,
      predictions: images,
      isPredicting: false,
      predictingTextClass: 'predicted-text-hidden',
      precisionPercentage: undefined
    }
  }

  onLoadPredictions() {
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
      let precisionPercentage = this.calculatePrecision(tranformedPredictions);
      this.setState({
        predictions: tranformedPredictions,
        isPredicting: false,
        predictingTextClass: 'predicted-text',
        precisionPercentage: precisionPercentage
      });
    }).catch((failure) => {
      this.setState({
        isPredicting: false,
        predictingTextClass: 'predicted-text-hidden'
      });
      console.log('Promise Failed: ', failure);
    });
  }

  calculatePrecision(predictions) {
    let falseNegativesCount = 0, truePositivesCount;
    let totalPredictions = predictions.length
    for(let i = 0; i < totalPredictions; i++) {
      if(predictions[i].actual !== predictions[i].predicted) {
        falseNegativesCount++;
      }
    }
    truePositivesCount = totalPredictions - falseNegativesCount;

    console.log("Prediction Percentage: ", ((totalPredictions - falseNegativesCount) / totalPredictions)*100);
    return ((totalPredictions - falseNegativesCount) / totalPredictions)*100;
  }

  onLoadImages() {
    let healthyImagesAll = this.AllImages[this.IMAGE_TYPE_HEALTHY];
    let diseasedImagesAll = this.AllImages[this.IMAGE_TYPE_DISEASED];
    if(healthyImagesAll.length === appConstants.image_end_index || diseasedImagesAll.length === appConstants.image_end_index) {
      appConstants.image_start_index = 0;
      appConstants.image_end_index = 5;
    }
    let start_index = appConstants.image_start_index + 5;
    let end_index = appConstants.image_end_index + 5;
    let healthyImages = this.AllImages[this.IMAGE_TYPE_HEALTHY].slice(start_index,end_index);
    let diseasedImages = this.AllImages[this.IMAGE_TYPE_DISEASED].slice(start_index,end_index);
    let images = healthyImages.concat(diseasedImages);
    appConstants.image_start_index = start_index;
    appConstants.image_end_index = end_index;
    this.setState({
      predictions: images,
      isPredicting: false,
      predictingTextClass: 'predicted-text-hidden'
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

  onViewChange(currentView) {
    let currentViewClass;
    if(currentView === appConstants.DEMO) {
      currentViewClass = Demo;
    } else {
      currentViewClass = DemoInformation;
    }
    this.setState({
      currentView: currentViewClass
    });
  }

  render() {
    let CurrentView = this.state.currentView;
    let props = {
      predictions: this.state.predictions,
      isPredicting: this.state.isPredicting,
      predictingTextClass: this.state.predictingTextClass
    }
    return (
      <section className = "dashboard-container">
        <AppHeader onViewChange = {this.onViewChange} onLoadImages = {this.onLoadImages}
          onLoadPredictions = {this.onLoadPredictions} precisionPercentage = {this.state.precisionPercentage} />
        <CurrentView {...props} />
      </section>
    )
  }
}

export default Dashboard
