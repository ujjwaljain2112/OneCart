import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "onecartlogin-a2e76.firebaseapp.com",
  projectId: "onecartlogin-a2e76",
  storageBucket: "onecartlogin-a2e76.firebasestorage.app",
  messagingSenderId: "724425330587",
  appId: "1:724425330587:web:5b0bafb556ea1b1f5cdb3e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

