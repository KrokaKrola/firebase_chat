import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyC4_S0giw20ykWB64IhR2gXcfsoCT8xTBY",
  authDomain: "chat-app-12a4f.firebaseapp.com",
  databaseURL: "https://chat-app-12a4f.firebaseio.com",
  projectId: "chat-app-12a4f",
  storageBucket: "chat-app-12a4f.appspot.com",
  messagingSenderId: "597244906332",
  appId: "1:597244906332:web:3e647de4ef980f02038f99"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
