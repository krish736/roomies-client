// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "roomies-ec796.firebaseapp.com",
  projectId: "roomies-ec796",
  storageBucket: "roomies-ec796.appspot.com",
  messagingSenderId: "808861689479",
  appId: "1:808861689479:web:4baf805d6882e31ab4ba22",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
