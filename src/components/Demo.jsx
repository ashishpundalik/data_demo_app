  import React, { Component } from 'react';

import PredictionImage from '../containers/PredictionImageContainer.js';

require('../scss/demo.scss');

class Demo extends Component {
  render() {
    let ImageElems = this.props.predictions.map((val, index) => {
      return <PredictionImage key = {index} index = {index} />
    });
    return (
      <section className = 'app-view app-demo-container'>
        <section className = 'retinopathy-images-table'>
          <div className = 'retinopathy-images-grid-container'>
            {ImageElems}
          </div>
        </section>
      </section>
    );
  }
}

export default Demo;
