import firebase from 'firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

export const doSignOut = () => firebase.auth().signOut();

export const doPasswordReset = email => firebase.auth().sendPasswordResetEmail(email);

export const doPasswordUpdate = password => firebase.auth().currentUser.updatePassword(password);

export const getUser = () => firebase.auth().currentUser;
