import db from '../config'; 
import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCnZVBXLEsNZS7N1w13thB2odRIUZ9RmPs",
    authDomain: "employment-station.firebaseapp.com",
    databaseURL: "https://employment-station-default-rtdb.firebaseio.com",
    projectId: "employment-station",
    storageBucket: "employment-station.appspot.com",
    messagingSenderId: "131854683675",
    appId: "1:131854683675:web:2ff1f5c1cacc9d88e2b2be"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();