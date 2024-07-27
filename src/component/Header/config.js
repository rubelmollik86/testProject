import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnyghXdOj3ib6gTiH5ZZ-zZd4YgU_UTto",
  authDomain: "flyfar-ladies-c3151.firebaseapp.com",
  projectId: "flyfar-ladies-c3151",
  storageBucket: "flyfar-ladies-c3151.appspot.com",
  messagingSenderId: "109991854644",
  appId: "1:109991854644:web:a5601492114e17aef30061",
  measurementId: "G-X90F1XTVLW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
