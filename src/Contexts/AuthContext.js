import React, {useContext, useState, useEffect } from 'react'
import {auth } from "../firebase"


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [loading, setLoading] = useState(true)

    const [currentUser, setCurrentUser] = useState()

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)

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
        signup
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
