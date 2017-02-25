import React from 'react';
import { IndexRedirect, Route } from 'react-router';

import AppContainer from './containers/AppContainer.js';
import DashboardContainer from  './containers/DashboardContainer.js';
import DemoContainer from  './containers/DemoContainer.js';
import PredictionInfoContainer from './containers/PredictionInfoContainer.js';
import BlogContainer from './containers/BlogContainer.js';

const routes = (
  <Route path='/' component = {AppContainer} >
    <IndexRedirect to = '/info' />
    <Route path = '/' component = {DashboardContainer}>
      <Route path = '/demo' component = {DemoContainer} />
      <Route path = '/info' component = {PredictionInfoContainer} />
      <Route path = '/blog' component = {BlogContainer} />
    </Route>
  </Route>
)

export default routes;
