import React, { Component } from 'react';

import PredictionImage from './PredictionImage.jsx';

require('../scss/demo.scss');

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: this.props.predictions,
      predictingTextClass: this.props.predictingTextClass,
      isPredicting: this.props.isPredicting
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      predictions: nextProps.predictions,
      predictingTextClass: nextProps.predictingTextClass,
      isPredicting: nextProps.isPredicting
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
        blinkClass: this.state.isPredicting ? 'blink-me' : '',
        imageBorderClass: val.actual === 0 ? 'retina-img-normal' : 'retina-img-diseased'
      };
      return <PredictionImage {...props} />
    });
    return (
      <section className = 'app-view app-demo-container'>
        <section className = 'retinopathy-images-table'>
          <div className = "retinopathy-images-grid-container">
            {ImageElem}
          </div>
        </section>
      </section>
    );
  }
}

export default Demo;
