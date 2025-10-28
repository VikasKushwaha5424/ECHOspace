import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({}); // Start with an empty object

  useEffect(() => {
    // 1. Get the basic authentication user (uid, email, etc.)
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubAuth();
    };
  }, []);

  // 2. NEW: When we get a user (currentUser.uid is available),
  //    listen for their data in the "users" collection in Firestore.
  useEffect(() => {
    let unsubFirestore;

    if (currentUser?.uid) {
      const userDocRef = doc(db, "users", currentUser.uid);
      
      unsubFirestore = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          // 3. MERGE the Firestore data (displayName, selectedBg)
          //    into the currentUser state.
          setCurrentUser((prevUser) => ({
            ...prevUser,
            ...doc.data(),
          }));
        }
      });
    }
    
    return () => {
      if (unsubFirestore) {
        unsubFirestore();
      }
    };
  }, [currentUser?.uid]); // This effect re-runs if the user's uid changes

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

