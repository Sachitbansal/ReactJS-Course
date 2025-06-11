import React, { useState, useEffect, useContext, use } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path as necessary
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider(props) {
    const {children} = props;
    const [user, setUser] = useState(null);
    const [globalData, setGlobalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUser(null);
        setGlobalData(null);
        return signOut(auth)
    }

    useEffect(()=>{
        
    })

    const value = {user, globalData, setGlobalData, isLoading, signUp, login, logout};,

    return (
        <AuthContext.Provider value={value}> 
            {children}
        </AuthContext.Provider>
    )
}