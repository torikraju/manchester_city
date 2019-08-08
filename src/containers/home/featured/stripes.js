import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';


class Stripes extends Component {
    state={
      stripes: [
        {
          background: '#98c5e9',
          left: 120,
          rotate: 25,
          top: -260,
          delay: 0,
        },
        {
          background: '#ffffff',
          left: 360,
          rotate: 25,
          top: -397,
          delay: 200,
        },
        {
          background: '#98c5e9',
          left: 600,
          rotate: 25,
          top: -498,
          delay: 400,
        },
      ],
    };

    showStripes=() => (
      this.state.stripes.map((el, index) => {
        return (
          <Animate
            key={index}
            show
            start={{
              background: '#ffffff',
              opacity: 0,
              left: 0,
              rotate: 0,
              top: 0,
            }}
            enter={{
              background: `${el.background}`,
              opacity: [1],
              left: [el.left],
              timing: { delay: el.delay, duration: 200, ease: easePolyOut },
              rotate: [el.rotate],
              top: [el.top],
            }}
          >
            {({
              opacity, left, background, rotate, top,
            }) => {
              return (
                <div
                  className="stripe"
                  style={{
                    background,
                    opacity,
                    transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
                  }}
                />
              );
            }}
          </Animate>
        );
      })
    );

    render() {
      return (
        <div className="featured_stripes">
          {this.showStripes()}
        </div>
      );
    }
}

export default Stripes;
