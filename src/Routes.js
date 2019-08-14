import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoutes from './components/authRoutes/privateRoutes';
import PublicRoutes from './components/authRoutes/publicRoutes';

import Layout from './HOC/Layout';
import Home from './containers/home';
import SignIn from './containers/signIn';
import Dashboard from './containers/admin/dashboard';
import AdminMatches from './containers/admin/matches';
import AddUpdateMatches from './containers/admin/addUpdateMatches';
import AdminPlayers from './containers/admin/players';
import AddUpdatePlayer from './containers/admin/addUpdatePlayer';
import TheTeam from './containers/TheTeam';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PublicRoutes {...props} path="/" exact component={Home} />
        <PublicRoutes {...props} path="/theTeam" exact component={TheTeam} />
        <PublicRoutes {...props} restricted path="/signIn" exact component={SignIn} />
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
        <PrivateRoutes {...props} path="/adminMatches" exact component={AdminMatches} />
        <PrivateRoutes {...props} path="/updateMatches/:id" exact component={AddUpdateMatches} />
        <PrivateRoutes {...props} path="/addMatches" exact component={AddUpdateMatches} />
        <PrivateRoutes {...props} path="/adminPlayers" exact component={AdminPlayers} />
        <PrivateRoutes {...props} path="/updatePlayer/:id" exact component={AddUpdatePlayer} />
        <PrivateRoutes {...props} path="/AddPlayer" exact component={AddUpdatePlayer} />
      </Switch>
    </Layout>
  );
};

export default Routes;
