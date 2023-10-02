import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACM71LgS7KlIku8d_c94YHWb9abWiHLuM",
  authDomain: "barbershop-d3d19.firebaseapp.com",
  projectId: "barbershop-d3d19",
  storageBucket: "barbershop-d3d19.appspot.com",
  messagingSenderId: "112027382224",
  appId: "1:112027382224:web:1aa4365ea9df437e6549d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};