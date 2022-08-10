// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC195coizlWWtYfPO-0es83fMOzVySUbKs",
  authDomain: "credly-e275f.firebaseapp.com",
  projectId: "credly-e275f",
  storageBucket: "credly-e275f.appspot.com",
  messagingSenderId: "849685490258",
  appId: "1:849685490258:web:7dbfd470c75b7d8da9cd8b",
  measurementId: "G-29NGE3T6VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
