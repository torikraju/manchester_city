import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { fbDataConvert } from '../../components/ui/miscellaneous';
import { firebaseDB } from '../../firebase';


const style = {
  cell: {
    padding: '4px 16px 4px 11px',
    borderBottom: '1px solid #ffffff',
    color: '#ffffff',
    textAlign: 'center',
  },
};


class LeagueTable extends Component {
    state = {
      positions: [],
    };

    componentDidMount() {
      (async () => {
        try {
          const getPositions = await firebaseDB.ref('positions').once('value');
          const allPositions = fbDataConvert(getPositions);
          this.setState({
            positions: allPositions,
          });
        } catch (e) {
          console.log(`error in componentDidMount:LeagueTable ${e}`);
        }
      })();
    }


    _showTeamPositions = pos => (
      pos
        ? pos.map((el, i) => (
          <TableRow key={i}>
            <TableCell style={style.cell}>{i + 1}</TableCell>
            <TableCell style={style.cell}>{el.team}</TableCell>
            <TableCell style={style.cell}>{el.w}</TableCell>
            <TableCell style={style.cell}>{el.d}</TableCell>
            <TableCell style={style.cell}>{el.l}</TableCell>
            <TableCell style={style.cell}>{el.pts}</TableCell>
          </TableRow>
        ))
        : null
    );


    render() {
      return (
        <div className="league_table_wrapper">
          <div className="title">
                    League Table
          </div>
          <div style={{ background: '#98c6e9' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={style.cell}>Pos</TableCell>
                  <TableCell style={style.cell}>Team</TableCell>
                  <TableCell style={style.cell}>W</TableCell>
                  <TableCell style={style.cell}>L</TableCell>
                  <TableCell style={style.cell}>D</TableCell>
                  <TableCell style={style.cell}>Pts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this._showTeamPositions(this.state.positions)}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }
}


export default LeagueTable;
