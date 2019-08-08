import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout';
import Home from './containers/home';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
