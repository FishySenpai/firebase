import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDvFnjfnsWQufJH-Fn0UbE497uMJxEJqgs",
  authDomain: "fir-3ac34.firebaseapp.com",
  projectId: "fir-3ac34",
  storageBucket: "fir-3ac34.appspot.com",
  messagingSenderId: "1037688142120",
  appId: "1:1037688142120:web:3ae3a2b0e1d01bcff1381d",
  measurementId: "G-ZSNNHFXSK1",
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);

