// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "asmadtech-4a343.firebaseapp.com",
  projectId: "asmadtech-4a343",
  storageBucket: "asmadtech-4a343.appspot.com",
  messagingSenderId: "850359421898",
  appId: "1:850359421898:web:98765f2638709b9ff25d33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);