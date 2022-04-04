import React, { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [goal, setGoal] = useState("loose weight");
  const [activityLevel, setActivityLevel] = useState("low");
  const [gender, setGender] = useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        goal,
        setGoal,
        activityLevel,
        setActivityLevel,
        gender,
        setGender,
        height,
        setHeight,
        weight,
        setWeight,

        register: async (email, password, name) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password).then(
              setDoc(doc(db, "users"), {
                name,
                email,
                goal,
                activityLevel,
                gender,
                height,
                weight,
              })
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
