import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create a user document in Firestore to store additional data like name
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      name,
      createdAt: new Date().toISOString()
    });
    return userCredential;
  };

  const logout = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
