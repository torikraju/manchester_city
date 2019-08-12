import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout';
import Home from './containers/home';
import SignIn from './containers/signIn';
import Dashboard from './containers/admin/dashboard';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signIn" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default Routes;
