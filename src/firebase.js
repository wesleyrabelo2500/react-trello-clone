import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
    apiKey: 'AIzaSyBbm75gKrf7TVrrEmgTxIHHT65_MvVrhwo',
    authDomain: 'react-trello-clone-51b0e.firebaseapp.com',
    projectId: 'react-trello-clone-51b0e',
    storageBucket: 'react-trello-clone-51b0e.appspot.com',
    messagingSenderId: '106309940838',
    appId: '1:106309940838:web:5b2bc7eae512b34cd1dfa7',
    measurementId: 'G-TL0XDG0THS',
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
