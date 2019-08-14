import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';

import AdminLayout from '../../../HOC/AdminLayout';
import { players } from '../../../firebase';
import { fbDataConvert, reverseArray } from '../../../components/ui/miscellaneous';
import styles from './style';

class AdminPlayers extends Component {
    state={
      isLoading: true,
      players: [],
    };

    componentDidMount() {
      (async () => {
        try {
          const getPlayers = await players.once('value');
          const allPlayers = reverseArray(fbDataConvert(getPlayers));
          this.setState({
            players: allPlayers,
            isLoading: false,
          });
        } catch (e) {
          console.log(`error in componentDidMount-AdminMatches ${e}`);
        }
      })();
    }

    _renderPlayers = () => (
      this.state.players
        ? this.state.players.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Link to={`/updatePlayer/${row.id}`}>{row.name}</Link>
            </TableCell>
            <TableCell>
              <Link to={`/updatePlayer/${row.id}`}>{row.lastname}</Link>
            </TableCell>
            <TableCell>{row.number}</TableCell>
            <TableCell>{row.position}</TableCell>
          </TableRow>
        ))
        : null
    );

    render() {
      const { classes } = this.props;
      return (
        <AdminLayout>
          <div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Position</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this._renderPlayers()}
                </TableBody>
              </Table>
            </Paper>
            <div className="admin_progress">
              {this.state.isLoading && <CircularProgress className={classes.progress} />}
            </div>
          </div>
        </AdminLayout>
      );
    }
}

export default withStyles(styles)(AdminPlayers);
