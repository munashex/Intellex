
import { initializeApp } from "firebase/app"; 
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "intellex-f4216.firebaseapp.com",
  projectId: "intellex-f4216",
  storageBucket: "intellex-f4216.appspot.com",
  messagingSenderId: "246826713958",
  appId: "1:246826713958:web:ca2e37ecf19aab99437ea7"
};


const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app)
export const auth = getAuth(app)