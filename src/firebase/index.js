// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// const apiKey =
//   import.meta.env.MODE === "development"
//     ? import.meta.env.VITE_FIREBASE_API_KEY
//     : "";
// Your web app's Firebase configuration
// console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vue-firebase-51d01.firebaseapp.com",
  projectId: "vue-firebase-51d01",
  storageBucket: "vue-firebase-51d01.appspot.com",
  messagingSenderId: "214767521771",
  appId: "1:214767521771:web:07fbc00c28f63d990e13ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { db, auth };
