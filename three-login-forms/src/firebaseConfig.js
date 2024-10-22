// Import the necessary Firebase functions using the modular SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyDSl89yqjniksESMwMCwbod1bT4wqAZIbU",
  authDomain: "manoshakti-2b9d5.firebaseapp.com",
  projectId: "manoshakti-2b9d5",
  storageBucket: "manoshakti-2b9d5.appspot.com",
  messagingSenderId: "679593792787",
  appId: "1:679593792787:web:c3bb2ea6d39db1fc05b6e6",
  measurementId: "G-DV301Z5E4X"
};

// Initialize Firebase using the modular SDK
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };