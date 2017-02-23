import React from 'react';
import Dashboard from '../containers/DashboardContainer.js';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className = "app-container">
        <Dashboard />
      </section>
    )
  }
}

export default App;
