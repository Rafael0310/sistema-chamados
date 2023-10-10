import { useState, createContext, useEffect } from "react"
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from "react-toastify"

import { useNavigate } from "react-router-dom"

export const AuthContext = createContext({})

function AuthProvider({children}){

    const[user, setUser] = useState(null)
    const[loadingAuth, setLoadingAuth] = useState(false)
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@ticketsPRO')

            if(storageUser){
                setUser(JSON.parse(storageUser))
            }
            
            setLoading(false)
        }

        loadUser()
    }, [])

    // Login
    async function signIn(email, password){
        setLoadingAuth(true)

        signInWithEmailAndPassword(auth, email, password).then(async(value) => {
            let uid = value.user.uid

            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Bem-vindo(a) de volta!')
            navigate("dashboard", {replace:true})
        }).catch((error) => {
            console.log(error)
            setLoadingAuth(false)
            toast.error('Ops algo deu errado!')
        })
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
        localStorage.setItem('@ticketsPRO', JSON.stringify(data))
    }

    async function logOut(){
        await signOut(auth)
        localStorage.removeItem('@ticketsPRO')
        setUser(null)
    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth,
            loading,
            logOut,
            navigate
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;