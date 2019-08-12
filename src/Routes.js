import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoutes from './components/authRoutes/privateRoutes';
import PublicRoutes from './components/authRoutes/publicRoutes';

import Layout from './HOC/Layout';
import Home from './containers/home';
import SignIn from './containers/signIn';
import Dashboard from './containers/admin/dashboard';
import AdminMatches from './containers/admin/matches';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PublicRoutes {...props} path="/" exact component={Home} />
        <PublicRoutes {...props} restricted path="/signIn" exact component={SignIn} />
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
        <PrivateRoutes {...props} path="/adminMatches" exact component={AdminMatches} />
      </Switch>
    </Layout>
  );
};

export default Routes;
