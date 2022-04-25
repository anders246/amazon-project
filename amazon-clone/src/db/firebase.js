import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBQNflEGBGbJoJxw5FTlfPCgWi1YogbLs",
    authDomain: "clone-5a579.firebaseapp.com",
    projectId: "clone-5a579",
    storageBucket: "clone-5a579.appspot.com",
    messagingSenderId: "451881027657",
    appId: "1:451881027657:web:9b15c15f83589d3ba59798",
    measurementId: "G-R2KBTH8WW7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  // actual db is firestore
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };