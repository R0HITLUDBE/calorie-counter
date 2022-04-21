import React, { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const register = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(authentication, email, password);
          } catch (err) {
            console.log(err);
          }
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(
              authentication,
              email,
              password
            );
          } catch (err) {
            console.log(err);
          }
        },
        logout: async () => {
          try {
            await signOut();
          } catch (err) {
            console.log(err);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
