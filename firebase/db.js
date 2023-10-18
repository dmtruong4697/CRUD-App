// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe2bEcvSCTBSFXZfyIey0cC8ubUfg5Ne4",
  authDomain: "crudapp-d499d.firebaseapp.com",
  projectId: "crudapp-d499d",
  storageBucket: "crudapp-d499d.appspot.com",
  messagingSenderId: "828449855859",
  appId: "1:828449855859:web:3694533d9d759906788d06",
  measurementId: "G-L5PQRLWZKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, analytics, db};