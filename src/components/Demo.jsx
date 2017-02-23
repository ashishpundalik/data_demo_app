  import React, { Component } from 'react';

import PredictionImage from '../containers/PredictionImageContainer.js';

require('../scss/demo.scss');

class Demo extends Component {
  render() {
    console.log("DEMO", this.props);
    let ImageElems = this.props.predictions.map((val, index) => {
      let imgPath = `assets/retina_images/${val.url}`;
      let props = {
        key: index,
        index,
        actualVal: val.actual,
        imgPath,
        predicted: (val.predicted !== null && val.predicted !== undefined) ? val.predicted : 'processing...',
        predictedTextClass: this.props.predictingTextClass,
        blinkClass: this.props.isPredicting ? 'blink-me' : '',
        imageBorderClass: val.actual === 0 ? 'retina-img-normal' : 'retina-img-diseased'
      };
      return <PredictionImage key = {index} index = {index} />
    });
    return (
      <section className = 'app-view app-demo-container'>
        <section className = 'retinopathy-images-table'>
          <div className = "retinopathy-images-grid-container">
            {ImageElems}
          </div>
        </section>
      </section>
    );
  }
}

export default Demo;
