import React, { Component } from 'react';
import { matches } from '../../../firebase';
import { fbDataConvert, reverseArray } from '../../../components/ui/miscellaneous';

class Blocks extends Component {
    state={
      matches: [],
    };

    componentDidMount() {
      (async () => {
        try {
          const getMatches = await matches.limitToLast(6).once('value');
          const matchesData = fbDataConvert(getMatches);
          this.setState({
            ...this.state,
            matches: reverseArray(matchesData),
          });
        } catch (e) {
          console.log(`error in componentDidMount-Blocks ${e}`);
        }
      })();
    }

    showMatches=() => {
      return (
        <div>Matches</div>
      );
    };

    render() {
      return (
        <div className="home_matches">
          {this.showMatches(this.state.matches)}
        </div>
      );
    }
}

export default Blocks;
