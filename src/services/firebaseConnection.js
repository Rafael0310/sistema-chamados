import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA8LHhXP6h_rEdJ5uyXzMx-v5ZcyeHBLnk",
    authDomain: "tickets-7891b.firebaseapp.com",
    projectId: "tickets-7891b",
    storageBucket: "tickets-7891b.appspot.com",
    messagingSenderId: "794554492291",
    appId: "1:794554492291:web:a780f51918de7480ab82b6",
    measurementId: "G-WE2LLP5BPM"
  }

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }