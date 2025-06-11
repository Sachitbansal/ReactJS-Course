import React, { useState, useEffect, useContext, use } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import path as necessary
const AuthContext = React.createContext();
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path as necessary
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const { children } = props;
    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    } 

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setGlobalUser(null);
        setGlobalData(null);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Auth state changed:", user);
            setGlobalUser(user);
            if (!user) {
                console.log("No user is signed in");
                return
            }

            try {
                setIsLoading(true);

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    firebaseData = docSnap.data();
                }

                setGlobalData(firebaseData)


            } catch (error) {
                console.error("Error fetching user data:", error.message);
            } finally {
                setIsLoading(false);
            }

         })
        return unsubscribe
    }, [])

    const value = { globalUser, globalData, setGlobalData, isLoading, signUp, login, logout };  

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}