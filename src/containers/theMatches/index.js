import React, { Component } from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { matches } from '../../firebase';
import { fbDataConvert, reverseArray } from '../../components/ui/miscellaneous';
import LeagueTable from './table';
import MatchesList from './matchesList';

class TheMatches extends Component {
    state = {
      isLoading: true,
      matches: [],
      filterMatches: [],
      playedFilter: 'All',
      resultFilter: 'All',
    };

    componentDidMount() {
      (async () => {
        try {
          const getMatches = await matches.once('value');
          const allMatches = fbDataConvert(getMatches);
          this.setState({
            isLoading: false,
            matches: reverseArray(allMatches),
            filterMatches: reverseArray(allMatches),
          });
        } catch (e) {
          console.log(`error in componentDidMount:TheMatches ${e}`);
        }
      })();
    }

    _showPlayed = played => {
      const list = this.state.matches.filter((match) => {
        return match.final === played;
      });

      this.setState({
        filterMatches: played === 'All' ? this.state.matches : list,
        playedFilter: played,
        resultFilter: 'All',
      });
    };

    _showResult = result => {
      const list = this.state.matches.filter((match) => {
        return match.result === result;
      });

      this.setState({
        filterMatches: result === 'All' ? this.state.matches : list,
        playedFilter: 'All',
        resultFilter: result,
      });
    }

    _showLoading = () => (
      <div className="not_found_container">
        <div className="lds-circle" />
      </div>
    );

    render() {
      return (
        <div className="the_matches_container">
          {this.state.isLoading
            ? this._showLoading()
            : (
              <div className="the_matches_wrapper">
                <div className="left">
                  <div className="match_filters">
                    <div className="match_filters">
                      <div className="match_filters_box">
                        <div className="tag">Show Match</div>
                        <div className="cont">
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.playedFilter === 'All' ? 'active' : ''}`}
                            onClick={() => this._showPlayed('All')}
                          >
                All
                          </div>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.playedFilter === 'Yes' ? 'active' : ''}`}
                            onClick={() => this._showPlayed('Yes')}
                          >
                Played
                          </div>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.playedFilter === 'No' ? 'active' : ''}`}
                            onClick={() => this._showPlayed('No')}
                          >
                Not played
                          </div>
                        </div>
                      </div>
                      <div className="match_filters_box">
                        <div className="tag">Result game</div>
                        <div className="cont">
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.resultFilter === 'All' ? 'active' : ''}`}
                            onClick={() => this._showResult('All')}
                          >
                All
                          </div>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.resultFilter === 'W' ? 'active' : ''}`}
                            onClick={() => this._showResult('W')}
                          >
                W
                          </div>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.resultFilter === 'L' ? 'active' : ''}`}
                            onClick={() => this._showResult('L')}
                          >
                L
                          </div>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                          <div
                            className={`option ${this.state.resultFilter === 'D' ? 'active' : ''}`}
                            onClick={() => this._showResult('D')}
                          >
                D
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <MatchesList matches={this.state.filterMatches} />
                </div>
                <div className="right">
                  <LeagueTable />
                </div>
              </div>
            )}
        </div>
      );
    }
}

export default TheMatches;
