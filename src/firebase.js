



import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTKtv-X2mLwbyQc2thWfOgkwKD30MJJ0s",
    authDomain: "phonepetransactions-7d90b.firebaseapp.com",
    databaseURL: "https://phonepetransactions-7d90b-default-rtdb.firebaseio.com",
    projectId: "phonepetransactions-7d90b",
    storageBucket: "phonepetransactions-7d90b.firebasestorage.app",
    messagingSenderId: "1071856471808",
    appId: "1:1071856471808:web:3701c4f8156d9a53072de5",
    measurementId: "G-CL3DPNE2RG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };