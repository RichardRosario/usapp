import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAyT0FEOTkgGtMSVn3IPqlHRYHcZskmX0I",
  authDomain: "usapp-69d6b.firebaseapp.com",
  databaseURL: "https://usapp-69d6b.firebaseio.com",
  projectId: "usapp-69d6b",
  storageBucket: "usapp-69d6b.appspot.com",
  messagingSenderId: "18704224945",
  appId: "1:18704224945:web:4acc163c86232fb8600890",
  measurementId: "G-P3ZS8G0J70",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
