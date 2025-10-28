// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Your new part (good!)
import { getAuth } from "firebase/auth";           // Your friend's part (needed!)
import { getFirestore } from "firebase/firestore"; // Your friend's part (needed!)
import { getStorage } from "firebase/storage";     // Your friend's part (needed!)

// Your web app's Firebase configuration
// This is YOUR config object, which is correct.
const firebaseConfig = {
  apiKey: "AIzaSyBnjU813WwbjqUSLR-ON2NXGQs2Jhou1gk",
  authDomain: "echospace-7cc49.firebaseapp.com",
  projectId: "echospace-7cc49",
  storageBucket: "echospace-7cc49.firebasestorage.app",
  messagingSenderId: "85248815267",
  appId: "1:85248815267:web:86c4cfe5eb006155874f16",
  measurementId: "G-94S8YVGBZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); // Your new part (good!)
export const auth = getAuth();              // Your friend's part (needed!)
export const storage = getStorage();        // Your friend's part (needed!)
export const db = getFirestore();         // Your friend's part (needed!)