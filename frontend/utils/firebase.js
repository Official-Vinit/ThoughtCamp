// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https{://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "thoughtcamp-2bdce.firebaseapp.com",
  projectId: "thoughtcamp-2bdce",
  storageBucket: "thoughtcamp-2bdce.firebasestorage.app",
  messagingSenderId: "689626124041",
  appId: "1:689626124041:web:1986926d0fc6fa56864dd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider};