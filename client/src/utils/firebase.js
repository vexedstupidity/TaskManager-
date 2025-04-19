// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-f6a6d.firebaseapp.com",
  projectId: "taskmanager-f6a6d",
  storageBucket: "taskmanager-f6a6d.firebasestorage.app",
  messagingSenderId: "726431532507",
  appId: "1:726431532507:web:f943000e75e6ca73e253fe",
  measurementId: "G-L57KJCNFZW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);