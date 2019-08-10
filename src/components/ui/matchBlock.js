import React from 'react';

export default ({ match }) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const localThmb = require(`../../resources/images/team_icons/${match.localThmb}.png`);
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const awayThmb = require(`../../resources/images/team_icons/${match.awayThmb}.png`);
  return (
    <div className="match_block">
      <div className="match_date">
        {match.final ? match.date : `Match not played yet: ${match.date}`}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div className="icon" style={{ background: `url(${localThmb})` }} />
            <div className="team_name">{match.local}</div>
          </div>
          <div className="right">
            { match.final ? match.resultLocal : '-'}
          </div>
        </div>
        <div className="match_bottom">
          <div className="left">
            <div className="icon" style={{ background: `url(${awayThmb})` }} />
            <div className="team_name">{match.away}</div>
          </div>
          <div className="right">
            { match.final ? match.resultAway : '-'}
          </div>
        </div>

      </div>
    </div>
  );
};
