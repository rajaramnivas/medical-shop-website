// // src/firebase/config.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyA60iSqExIiN6ouBTDWNoXYiCSuyT9qRQY",  // Your API key
//   authDomain: "medical-8b0a8.firebaseapp.com",  // Your auth domain
//   projectId: "medical-8b0a8",  // Your project ID
//   storageBucket: "medical-8b0a8.firebasestorage.app",  // Your storage bucket
//   messagingSenderId: "595733249479",  // Your messaging sender ID
//   appId: "1:595733249479:web:7eed4d111472f0255bede2"  // Your app ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);  // Firestore database reference
// const auth = getAuth(app);  // Firebase Authentication reference

// export { db, auth };


// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from your provided object
const firebaseConfig = {
  apiKey: "AIzaSyA60iSqExIiN6ouBTDWNoXYiCSuyT9qRQY",
  authDomain: "medical-8b0a8.firebaseapp.com",
  projectId: "medical-8b0a8",
  storageBucket: "medical-8b0a8.firebasestorage.app",
  messagingSenderId: "595733249479",
  appId: "1:595733249479:web:7eed4d111472f0255bede2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and db for use in other parts of the app
export { auth, db };
