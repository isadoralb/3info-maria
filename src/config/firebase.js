// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEkBHBKwE5GmrMbzjyxozveDfJMFvbDQo",
  authDomain: "revisao-171bc.firebaseapp.com",
  projectId: "revisao-171bc",
  storageBucket: "revisao-171bc.appspot.com",
  messagingSenderId: "727363036786",
  appId: "1:727363036786:web:71538de02dbc430080c4eb",
  measurementId: "G-K4ZWJ1X7YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);