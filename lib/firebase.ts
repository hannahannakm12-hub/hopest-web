import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyeCMO81JAYrosUJ9EBEZuPXisKcgP1cM",
  authDomain: "hopest-auth.firebaseapp.com",
  projectId: "hopest-auth",
  storageBucket: "hopest-auth.firebasestorage.app",
  messagingSenderId: "413876924531",
  appId: "1:413876924531:web:44a2f99529b6d02738fa06",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);