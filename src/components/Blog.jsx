import React, { Component } from 'react';

require('../scss/blog.scss');

class Blog extends Component {
  render() {
    return (
      <section className = 'app-view blog-view-container'>
        <section className = 'blog-content-container'>
          <div className = 'blog-content-text-container'>
            <h3>Diabetic retinopathy detection</h3>
            <h4>Automated screening for diabetic retinopathy using deep neural networks</h4>
            <p>
              Diabetic Retinopathy or Diabetic Eye Disease is the damage caused to vision due to diabetes.
              Prolonged presence of diabetes and uncontrolled blood sugar levels may cause hemorrhages in
              the retina’s blood vessels. It is known to affect almost 80% of the patients who are
              diagnosed with diabetes. A severe complication may even lead to blindness.
            </p>
            <p>
              Therefore, detection of the eye disease at an early stage is essential,
              and there has been a need for automation of the diagnosis for this eye disease in the recent years.
            </p>
            <p>
              Developments in the field of research for image recognition using deep neural networks
              has led to groundbreaking advances in it’s use in the medical field as well.
              Deep neural networks have been used to diagnose diabetic retinopathy with fundus images of the retina.
            </p>
            <p>
              In this demo we have used a deep neural network, trained on 26,000 fundus images.
            </p>
          </div>
          <div className = 'blog-content-imgs-container'>
            <img className = 'blog-info-image' src = '../assets/retina_images/blog-info-img-normal.png' />
            <img className = 'blog-info-image' src = '../assets/retina_images/blog-info-img-affected.png' />
          </div>
        </section>
      </section>
    )
  }
}

export default Blog;
