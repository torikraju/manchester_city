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

export const fbDataConvert = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

export const reverseArray = (actualArray) => {
  const reversedArray = [];
  for (let i = actualArray.length - 1; i >= 0; i--) {
    reversedArray.push(actualArray[i]);
  }
  return reversedArray;
};

export const playerImage = (players) => {
  const position = {
    Keeper: 'KEEP',
    Defence: 'DEF',
    Midfield: 'MIDF',
    Striker: 'STRIK',
  };
  const r = [];
  // eslint-disable-next-line no-plusplus
  for (let n = 1; n <= 4; ++n) {
    const i = Math.floor((Math.random() * (20 - n)) + 1);
    const player = players[i];
    const imageName = `${player.name.toLowerCase()}_${player.lastname.toLowerCase()}.png`;
    player.imageUrl = `../../../resources/images/players/player_to_upload/${position[player.position]}/${imageName}`;
    r.push(player);
    // eslint-disable-next-line no-param-reassign
    players[i] = players[19 - n];
  }
  return r;
};
