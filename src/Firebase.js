import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "test-ef18f.firebaseapp.com",
  projectId: "test-ef18f",
  storageBucket: "test-ef18f.appspot.com",
  messagingSenderId: "881822133409",
  appId: "1:881822133409:web:f3726cf426eaa5772054e0"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)



