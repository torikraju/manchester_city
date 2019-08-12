import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from './components/authRoutes/privateRoutes';

import Layout from './HOC/Layout';
import Home from './containers/home';
import SignIn from './containers/signIn';
import Dashboard from './containers/admin/dashboard';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signIn" exact component={SignIn} />
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default Routes;
