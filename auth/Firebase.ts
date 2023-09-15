import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUb4aGFEMWyE_-Plj84i_pntR4dewXHto",
  authDomain: "filmzee-82b53.firebaseapp.com",
  projectId: "filmzee-82b53",
  storageBucket: "filmzee-82b53.appspot.com",
  messagingSenderId: "746072214723",
  appId: "1:746072214723:web:fc2509aa0c951baa836676",
  measurementId: "G-1S5Y1ZWRTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
