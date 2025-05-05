// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";	
import { getFirestore } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_UfIjQftwo9_eyj4HigvFbmCHIWCTQu8",
  authDomain: "chatapp-33c1c.firebaseapp.com",
  projectId: "chatapp-33c1c",
  storageBucket: "chatapp-33c1c.firebasestorage.app",
  messagingSenderId: "748946431622",
  appId: "1:748946431622:web:72c2f1b74c69ad723a7b07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app); // Google Auth Provider
export const db = getFirestore(app); // Firestore Database