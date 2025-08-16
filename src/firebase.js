import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDVoatikhMZYsC8Ek4YZ54SB2w-ZW_Nmc",
  authDomain: "desa-tunjungtirto-99cc7.firebaseapp.com",
  databaseURL: "https://desa-tunjungtirto-99cc7-default-rtdb.firebaseio.com",
  projectId: "desa-tunjungtirto-99cc7",
  storageBucket: "desa-tunjungtirto-99cc7.firebasestorage.app",
  messagingSenderId: "835214097591",
  appId: "1:835214097591:web:a7f847f610f514d647a132",
  measurementId: "G-4HKYYJXS8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };

