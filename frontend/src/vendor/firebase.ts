import firebase from 'firebase/compat/app'
import { getFunctions } from 'firebase/functions'

const apiKey = process.env['REACT_APP_FIREBASE_API']
export const firebaseConfig = {
  apiKey,
  authDomain: 'profile-38860.firebaseapp.com',
  projectId: 'profile-38860',
  storageBucket: 'profile-38860.appspot.com',
  messagingSenderId: '606089239250',
  appId: process.env['REACT_APP_FIREBASE_APP_ID'],
}

// Initialize Firebase
export const firebaseInstance = firebase.initializeApp(firebaseConfig)
// Initialize Firebase functions
export const firebaseFunctions = getFunctions()
