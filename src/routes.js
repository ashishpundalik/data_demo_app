import React from 'react';
import { IndexRedirect, Route } from 'react-router';

import AppContainer from './containers/AppContainer.js';
import DashboardContainer from  './containers/DashboardContainer.js';
import DemoContainer from  './containers/DemoContainer.js';
import PredictionInfoContainer from './containers/PredictionInfoContainer.js';

const routes = (
  <Route path='/' component = {AppContainer} >
    <IndexRedirect to = "/demo" />
    <Route path = "/" component = {DashboardContainer}>
      <Route path = "/demo" component = {DemoContainer} />
      <Route path = "/info" component = {PredictionInfoContainer} />
    </Route>
  </Route>
)

export default routes;
