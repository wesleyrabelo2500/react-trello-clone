import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { db } from './firebase';

const firebaseAuth = () => firebase.auth();

export const createUserWithEmailAndPassword = (email, password) =>
    firebaseAuth().createUserWithEmailAndPassword(email, password);

export const signInWithEmailAndPassword = (email, password) =>
    firebaseAuth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebaseAuth().signOut();

export const getUser = () => firebaseAuth().currentUser;

export const createUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const authService = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getUser,
    createUser,
};
