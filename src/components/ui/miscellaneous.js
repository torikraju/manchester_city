import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  tagContainer: props => {
    return {
      background: props.bck,
      fontSize: props.size,
      color: props.color,
      padding: '5px 10px',
      display: 'inline-block',
      fontFamily: 'Righteous',
      ...props.add,
    };
  },
});


export const Tag = (props) => {
  const classes = styles(props);
  const template = <div className={classes.tagContainer}>{props.children}</div>;
  if (props.link) return <Link to={props.linkTo}>{template}</Link>;
  return template;
};
