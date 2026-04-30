import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured."));
    }

    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    if (!auth) {
      return Promise.reject(new Error("Firebase is not configured."));
    }

    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    if (!auth) {
      setUser(null);
      return Promise.resolve();
    }

    setUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    if (!auth) {
      setUser(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(userAuthContext);
}
