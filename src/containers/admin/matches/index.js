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
import { matches } from '../../../firebase';
import { fbDataConvert, reverseArray } from '../../../components/ui/miscellaneous';
import styles from './style';


class AdminMatches extends Component {
    state={
      isLoading: true,
      matches: [],
    };

    componentDidMount() {
      (async () => {
        try {
          const getMatches = await matches.once('value');
          const matchesData = fbDataConvert(getMatches);
          this.setState({
            ...this.state,
            matches: reverseArray(matchesData),
            isLoading: false,
          });
        } catch (e) {
          console.log(`error in componentDidMount-AdminMatches ${e}`);
        }
      })();
    }

    render() {
      const { classes } = this.props;
      return (
        <AdminLayout>
          <div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Matches</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Final</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.matches
                    ? this.state.matches.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                          <Link to={`/updateMatches/${row.id}`}>
                            {row.away} <strong>-</strong> {row.local}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {row.resultAway} <strong>-</strong> {row.resultLocal}
                        </TableCell>
                        <TableCell>
                          {row.final === 'Yes'
                            ? <span className="matches_tag_red">Final</span>
                            : <span className="matches_tag_green">Not Played Yet </span>
                             }
                        </TableCell>
                      </TableRow>
                    ))
                    : null
                  }
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

export default withStyles(styles)(AdminMatches);
