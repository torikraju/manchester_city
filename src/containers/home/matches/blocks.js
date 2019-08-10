import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';

import { matches } from '../../../firebase';
import { fbDataConvert, reverseArray } from '../../../components/ui/miscellaneous';
import MatchBlock from '../../../components/ui/matchBlock';

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

    showMatches=(_matches) => {
      return _matches
        ? _matches.map(el => (
          <Slide key={el.id} bottom>
            <div className="item">
              <div className="wrapper">
                <MatchBlock match={el} />
              </div>
            </div>
          </Slide>
        ))
        : null;
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
