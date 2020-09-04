import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB5Y0DOrMKxyxitVkOug-Qjhb7938gAk04",
    authDomain: "moneysaver-a01f7.firebaseapp.com",
    databaseURL: "https://moneysaver-a01f7.firebaseio.com",
    projectId: "moneysaver-a01f7",
    storageBucket: "moneysaver-a01f7.appspot.com",
    messagingSenderId: "898579560589",
    appId: "1:898579560589:web:d21a7e36ac10c4b7de8ac4"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;