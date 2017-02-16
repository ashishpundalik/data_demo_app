import React, { Component } from 'react';

require('../scss/appHeader.scss');

class AppHeader extends Component {
  constructor() {
    super();
    this.resetClassName = (classNameVal, elems) => {
      for(let elem of elems) {
        elem.className = classNameVal;
      }
    };

    this.onNavBtnClicked = (view, event) => {
      event.stopPropagation();
      let btnElems = event.target.parentNode.children;
      this.resetClassName("nav-btn", btnElems);
      event.target.className = "nav-btn nav-btn-active";
      this.props.onViewChange(view);
    }
  }

  render() {
    return (
      <nav className = "app-header-container">
        <header className = "app-header align-vertical-center">
          <h1>Diabetic Retinopathy Diagnosis(DRD)</h1>
        </header>
        <section className = "header-nav-btns-container">
          <button className = "nav-btn" onClick = {this.onNavBtnClicked.bind(this, "infoView")}>INFO</button>
          <button className = "nav-btn nav-btn-active" onClick = {this.onNavBtnClicked.bind(this, "demoView")}>DEMO</button>
        </section>
      </nav>
    )
  }
}

export default AppHeader
