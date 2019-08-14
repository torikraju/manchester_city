import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: 'gs://manchester-city-89406.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const matches = firebaseDB.ref('matches');
const players = firebaseDB.ref('players');
const promotions = firebaseDB.ref('positions');
const teams = firebaseDB.ref('teams');

export {
  firebase,
  matches,
  players,
  promotions,
  teams,
  firebaseDB,
};
