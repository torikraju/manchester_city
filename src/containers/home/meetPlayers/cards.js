import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import Otamendi from '../../../resources/images/players/Otamendi.png';
import PlayerCard from '../../../components/ui/playerCard';

export default class extends Component {
    state={
      cards: [
        {
          bottom: 90,
          left: 300,
        },
        {
          bottom: 60,
          left: 200,
        }, {
          bottom: 30,
          left: 100,
        }, {
          bottom: 0,
          left: 0,
        },
      ],
    };


    _animateCards = () => (
      this.state.cards.map((el, index) => (
        <Animate
          key={index}
          show={this.props.show}
          start={{
            left: 0,
            bottom: 0,
          }}
          enter={{
            left: [el.left],
            bottom: [el.bottom],
            timing: { duration: 500, ease: easePolyOut },
          }}
        >
          {({ left, bottom }) => {
            return (
              <div style={{
                position: 'absolute',
                left,
                bottom,
              }}
              >
                <PlayerCard
                  bck={Otamendi}
                  number="30"
                  name="Nicolas"
                  lastname="Otamendi"
                />
              </div>
            );
          }}
        </Animate>
      ))
    );

    render() {
      return (
        <div>
          {this._animateCards()}
        </div>
      );
    }
}
