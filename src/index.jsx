import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx'

require('./scss/main.scss');

render(
  <App />,
  document.getElementById("app")
)
