// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCi-cLxn8D5X4E_mAPrWQVLAAuORCc--GQ",
    authDomain: "plantdoctor-39e3f.firebaseapp.com",
    //databaseURL: ""
    projectId: "plantdoctor-39e3f",
    storageBucket: "plantdoctor-39e3f.appspot.com",
    messagingSenderId: "222862942618",
    appId: "1:222862942618:web:6401dcff3541a208e5da23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)