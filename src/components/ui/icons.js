import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import mCityLogo from '../../resources/images/logos/manchester_city_logo.png';

const styles = makeStyles({
  imgCover: props => {
    return {
      width: props.width,
      height: props.height,
      background: `url(${mCityLogo}) no-repeat`,
    };
  },
});

export const CityLogo = (props) => {
  const classes = styles(props);
  const template = <div className={`img_cover ${classes.imgCover}`} />;
  if (props.link) return <Link className="link_logo" to={props.linkTo}>{template}</Link>;
  return template;
};
