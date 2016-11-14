const firebase = require('firebase');
  var config = {
    apiKey: "AIzaSyBguFpMprVQ9HuU1YNfgfdUhMs-k05jGx8",
    authDomain: "environment-manager.firebaseapp.com",
    databaseURL: "https://environment-manager.firebaseio.com",
    storageBucket: "environment-manager.appspot.com",
    messagingSenderId: "22092140821"
  };
export const firebase_init = firebase.initializeApp(config);
export const rootRef = firebase.database().ref();
export const storage = firebase.storage();
