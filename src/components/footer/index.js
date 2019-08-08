import React from 'react';

import { CityLogo } from '../ui/icons';

export default () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo
          link
          linkTo="/"
          width="70px"
          height="70px"
        />
        <div className="footer_discl">
            © 2019 Manchester City FC
        </div>
      </div>
    </footer>
  );
};
