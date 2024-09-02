import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJMecMOUPaC-7qGwPppv6mYduXgEFba1o",
  authDomain: "book-list-with-firebase-4c216.firebaseapp.com",
  projectId: "book-list-with-firebase-4c216",
  storageBucket: "book-list-with-firebase-4c216.appspot.com",
  messagingSenderId: "489236356282",
  appId: "1:489236356282:web:093a6b01698d2617f87683",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
