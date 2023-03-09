// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDltrDf09L_yKjbpfqpZVWyA1BlBn1bPks",
  authDomain: "file-upload-372af.firebaseapp.com",
  projectId: "file-upload-372af",
  storageBucket: "file-upload-372af.appspot.com",
  messagingSenderId: "77516190137",
  appId: "1:77516190137:web:5dd13adb7ef4be45554668"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);