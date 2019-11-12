const firebase = require("firebase")


const firebaseConfig = {
  apiKey: "AIzaSyAE0l5jF-PDZAEXOLJKX46cS6Lho5-jJdY",
  authDomain: "briansboelsebix.firebaseapp.com",
  databaseURL: "https://briansboelsebix.firebaseio.com",
  projectId: "briansboelsebix",
  storageBucket: "briansboelsebix.appspot.com",
  messagingSenderId: "615853025538",
  appId: "1:615853025538:web:0fcdb17df49a762547ba1b"
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;