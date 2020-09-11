import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBDv4fqaGt6ia0uyfXhUyzVWxVspUQf5kU',
  authDomain: 'clone-f85ec.firebaseapp.com',
  databaseURL: 'https://clone-f85ec.firebaseio.com',
  projectId: 'clone-f85ec',
  storageBucket: 'clone-f85ec.appspot.com',
  messagingSenderId: '1062946620903',
  appId: '1:1062946620903:web:6a9977f4b312ae57c26942',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//initalize DB
const db = firebaseApp.firestore();

//handle authentication
const auth = firebase.auth();

export { db, auth };
