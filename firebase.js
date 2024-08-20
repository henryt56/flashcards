// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD42FSDwsAbeYsesYDm5guGZkC4Y0MRB9w",
  authDomain: "flashcard-83c4a.firebaseapp.com",
  projectId: "flashcard-83c4a",
  storageBucket: "flashcard-83c4a.appspot.com",
  messagingSenderId: "715338406368",
  appId: "1:715338406368:web:28a9b5f150fdd72a8a7385",
  measurementId: "G-NNC554RBJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}