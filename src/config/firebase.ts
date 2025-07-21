// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChgdwK60sON9O-TAB8mZXxIVjkGWB2zTA",
  authDomain: "keto-diary-app.firebaseapp.com",
  projectId: "keto-diary-app",
  storageBucket: "keto-diary-app.firebasestorage.app",
  messagingSenderId: "302179352175",
  appId: "1:302179352175:web:bd69bee776b721cb6a979a",
  measurementId: "G-ZLV09Y9914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
const analytics = getAnalytics(app);