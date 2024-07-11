// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRhCmhi-Dw5yx_ba3z0K7uRf1I5_OaceE",
  authDomain: "erlang-fd099.firebaseapp.com",
  projectId: "erlang-fd099",
  storageBucket: "erlang-fd099.appspot.com",
  messagingSenderId: "694579795386",
  appId: "1:694579795386:web:707a10cf81b503ad117983",
  measurementId: "G-8F0Z46VLBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)