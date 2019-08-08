import React from 'react';

import Stripe from './stripes';
import Text from './text';

export default () => {
  return (
    <div className="featured_wrapper">
      <Stripe />
      <Text />
    </div>
  );
};
