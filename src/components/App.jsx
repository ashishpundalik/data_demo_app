import React from 'react';
import Dashboard from '../containers/DashboardContainer.js';
import { IndexRoute } from 'react-router';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className = 'app-container'>
        {this.props.children}
      </section>
    )
  }
}

export default App;
