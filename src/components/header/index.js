import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import { CityLogo } from '../ui/icons';
import styles from './style';


// eslint-disable-next-line react/prefer-stateless-function
class Index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.topBar}>
          <div className={classes.topBarContainer}>
            <div className="header_logo">
              <CityLogo link linkTo="/" width="70px" height="70px" />
            </div>
          </div>
          <Link to="/theTeam">
            <Button href="" color="inherit">The Team</Button>
          </Link>
          <Link to="/matches">
            <Button href="" color="inherit">Matches</Button>
          </Link>
        </Toolbar>

      </AppBar>
    );
  }
}

export default withStyles(styles)(Index);
