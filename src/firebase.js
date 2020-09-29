import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyAa3PgO5OWu7wA9S-xBt17SymyBBFjHVeo",
  authDomain: "grocery-e3586.firebaseapp.com",
  databaseURL: "https://grocery-e3586.firebaseio.com",
  projectId: "grocery-e3586",
  storageBucket: "grocery-e3586.appspot.com",
  messagingSenderId: "505605827332",
  appId: "1:505605827332:web:fc287d55babbf9f3f0fe51",
  //  measurementId: "G-HG3V9ZDDJ6"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BIAfTwO0y7UXhD4jzcHj_c5zgHJcEvtxM9VT5_V9HcMxPfi5DkHrpyJIW3C5Wrwk9THUho7Pa4fnjIPI-uYqcHs"
);
export { messaging };