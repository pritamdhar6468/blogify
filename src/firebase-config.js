// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from  "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAeIaDyh331SzgLhfFDd-VjQPUpERXmfo",
  authDomain: "blogify-52219.firebaseapp.com",
  projectId: "blogify-52219",
  storageBucket: "blogify-52219.appspot.com",
  messagingSenderId: "316568647945",
  appId: "1:316568647945:web:4c038880eab76ff68c3bd8",
  measurementId: "G-QM6X0R5V0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();