// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "rentify-bg.firebaseapp.com",
  projectId: "rentify-bg",
  storageBucket: "rentify-bg.appspot.com",
  messagingSenderId: "139919059951",
  appId: "1:139919059951:web:00f0ac40b09fe396bca41a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);