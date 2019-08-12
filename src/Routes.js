import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout';
import Home from './containers/home';
import SignIn from './containers/signIn';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signIn" exact component={SignIn} />
      </Switch>
    </Layout>
  );
};

export default Routes;
