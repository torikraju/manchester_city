import React, { Component } from 'react';

import stripes from '../../../resources/images/stripes.png';
import { Tag } from '../../../components/ui/miscellaneous';

class Index extends Component {
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
        <div
          className="home_meetplayers"
          style={{ background: `#ffffff url(${stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
              Card
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
      );
    }
}

export default Index;
