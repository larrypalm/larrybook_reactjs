import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCj0j39eUbTInGAl4NgRVFamfiJNMEBQ0k",
  authDomain: "larrybook-6f15d.firebaseapp.com",
  databaseURL: "https://larrybook-6f15d.firebaseio.com",
  projectId: "larrybook-6f15d",
  storageBucket: "larrybook-6f15d.appspot.com",
  messagingSenderId: "809897125505"
};
firebase.initializeApp(config);

export default firebase;
