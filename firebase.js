import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC1tRwH2OZTB5pNjZOLa5IZFsbWSRNRkYY",
  authDomain: "calorie-counter-6d620.firebaseapp.com",
  projectId: "calorie-counter-6d620",
  storageBucket: "calorie-counter-6d620.appspot.com",
  messagingSenderId: "240152883780",
  appId: "1:240152883780:web:d1b3ec0d4eb67e27010211",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  signOut(auth);
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return currentUser;
};
