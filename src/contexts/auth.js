import { useState, createContext, useEffect } from "react"
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from "react-toastify"

import { useNavigate } from "react-router-dom"

export const AuthContext = createContext({})

function AuthProvider({children}){

    const[user, setUser] = useState(null)
    const[loadingAuth, setLoadingAuth] = useState(false)

    const navigate = useNavigate()

    // Login
    function signIn(email, password){

    }

    // Cadastro
    async function signUp(name, email, password){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password).then(async(value) => {
            let uid = value.user.uid

            await setDoc(doc( db, "users", uid), {
                name: name,
                avatarUrl: null,
            }).then(() => {
                
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false);
                toast.success('Seja bem vindo ao sistema!')
                navigate('/dashboard', {replace:true})
            })
        }).catch((error) => {
            console.error(error)
            setLoadingAuth(false)
        })
    }

    function storageUser(data){
        localStorage.setItem('@ticketsPRO')
    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth,
            navigate
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;