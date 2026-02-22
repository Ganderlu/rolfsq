"use client";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
// apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDj9kfbgaPxYAdOvncA725w0JKCAWn1lQg",
//   authDomain: "Noble Vest-d179b.firebaseapp.com",
//   projectId: "Noble Vest-d179b",
//   storageBucket: "Noble Vest-d179b.firebasestorage.app",
//   messagingSenderId: "313887622700",
//   appId: "1:313887622700:web:b435cd0586929dbfcdb389",
//   measurementId: "G-YNKF3KV6JT",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj9kfbgaPxYAdOvncA725w0JKCAWn1lQg",
  authDomain: "rolfsq-d179b.firebaseapp.com",
  projectId: "rolfsq-d179b",
  storageBucket: "rolfsq-d179b.firebasestorage.app",
  messagingSenderId: "313887622700",
  appId: "1:313887622700:web:b435cd0586929dbfcdb389",
  measurementId: "G-YNKF3KV6JT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
