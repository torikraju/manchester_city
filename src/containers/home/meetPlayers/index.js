import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';

import stripes from '../../../resources/images/stripes.png';
import { Tag } from '../../../components/ui/miscellaneous';
import HomeCards from './cards';


class Index extends Component {
    state = {
      show: false,
    };

    getTag =(title) => (
      <Tag
        bck="#0e1731"
        size="100px"
        color="#ffffff"
        add={{
          display: 'inline-block',
          marginBottom: '20px',
        }}
      >
        {title}
      </Tag>
    );

    render() {
      return (
        <Reveal
          fraction={0.7}
          onReveal={() => {
            this.setState({ show: true });
          }}
        >
          <div
            className="home_meetplayers"
            style={{ background: `#ffffff url(${stripes})` }}
          >
            <div className="container">
              <div className="home_meetplayers_wrapper">
                <div className="home_card_wrapper">
                  <HomeCards show={this.state.show} />
                </div>
                <div className="home_text_wrapper">
                  {this.getTag('Meet')}
                  {this.getTag('The')}
                  {this.getTag('Player')}
                  <div>
                    <Tag
                      bck="#ffffff"
                      size="27px"
                      color="#0e1731"
                      link
                      linkTo="/theTeam"
                      add={{
                        display: 'inline-block',
                        marginBottom: '27px',
                        border: '1px solid #0e1731',
                      }}
                    >
                                      Meet then here
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      );
    }
}

export default Index;
