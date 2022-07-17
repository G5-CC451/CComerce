import * as app from "firebase/app";
import * as auth from "firebase/auth";

// Web app Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE.API_KEY,
  authDomain: process.env.FIREBASE.AUTH_DOMAIN,
  projectId: process.env.FIREBASE.PROJECT_ID,
  storageBucket: process.env.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE.MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE.APP_ID,
  measurementId: process.env.FIREBASE.MEASUREMENT_ID,
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const googleAuthProvider = new auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
