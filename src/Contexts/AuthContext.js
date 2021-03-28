import React, {useContext, useState, useEffect } from 'react'
import {auth } from "../firebase"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
// at 26:48
export function AuthProvider({children}) {
    const [loading, setLoading] = useState(true)

    const [currentUser, setCurrentUser] = useState()

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)

    }
    
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)

    }
    
    function logout(){
        return auth.signOut()

    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      }
    
      function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
      function updatePassword(password) {
        return currentUser.updatePassword(password)
      }
    
    

    //sets user to currentUser inside of useEffect so only runs on component mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])
    

    const value= {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
