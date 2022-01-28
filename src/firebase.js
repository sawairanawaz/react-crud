import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTJ_0yVCw8ImqanQf780V4YXwFjWyS1CU",
  authDomain: "crud-b8411.firebaseapp.com",
  projectId: "crud-b8411",
  storageBucket: "crud-b8411.appspot.com",
  messagingSenderId: "596399381885",
  appId: "1:596399381885:web:a770bbc7b348c3b839c014",
  measurementId: "G-HV15VQ00EF"};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);