import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import { firebase, players } from '../../firebase';
import { fbDataConvert } from '../../components/ui/miscellaneous';
import Stripes from '../../resources/images/stripes.png';
import PlayerCard from '../../components/ui/playerCard';

class TheTeam extends Component {
    state = {
      isLoading: true,
      players: [],
    };

    componentDidMount() {
      (async () => {
        try {
          const getPlayers = await players.once('value');
          const allPlayers = fbDataConvert(getPlayers);

          const promises = [];
          for (const key in allPlayers) {
            promises.push(
              // eslint-disable-next-line no-unused-vars
              new Promise(async (resolve, reject) => {
                allPlayers[key].url = await firebase.storage().ref('players').child(allPlayers[key].image).getDownloadURL();
                resolve();
              }),
            );
          }
          await Promise.all(promises);
          this.setState({
            isLoading: false,
            players: allPlayers,
          });
        } catch (e) {
          console.log(`error in componentDidMount:TehTeam ${e}`);
        }
      })();
    }

    _showPlayersByCategory = category => (
      this.state.players
        ? this.state.players.map((player, i) => {
          return player.position === category
            ? (
              <Fade left delay={i * 20} key={i}>
                <div className="item">
                  <PlayerCard
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                    bck={player.url}
                  />
                </div>
              </Fade>
            )
            : null;
        })
        : null
    );

    render() {
      return (
        <div
          className="the_team_container"
          style={{
            background: `url(${Stripes}) repeat`,
          }}
        >
          {this.state.isLoading
            ? <div className="lds-circle" />
            : (
              <div>
                <div className="team_category_wrapper">
                  <div className="title">Keepers</div>
                  <div className="team_cards">
                    {this._showPlayersByCategory('Keeper')}
                  </div>
                </div>
                <div className="team_category_wrapper">
                  <div className="title">Defence</div>
                  <div className="team_cards">
                    {this._showPlayersByCategory('Defence')}
                  </div>
                </div>
                <div className="team_category_wrapper">
                  <div className="title">Midfield</div>
                  <div className="team_cards">
                    {this._showPlayersByCategory('Midfield')}
                  </div>
                </div>
                <div className="team_category_wrapper">
                  <div className="title">Strikers</div>
                  <div className="team_cards">
                    {this._showPlayersByCategory('Striker')}
                  </div>
                </div>
              </div>
            )
            }
        </div>
      );
    }
}

export default TheTeam;
