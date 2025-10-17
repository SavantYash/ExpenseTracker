// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8hkK0SPSyd7Yu1hPJfxEpS4gHyeQfbi0",
    authDomain: "expensetracker-2504b.firebaseapp.com",
    projectId: "Yexpensetracker-2504b",
    storageBucket: "expensetracker-2504b.appspot.com",
    messagingSenderId: "208012497749",
    appId: "1:208012497749:android:62d51c48245efefe5815dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };