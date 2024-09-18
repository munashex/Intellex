import {useState, useEffect} from 'react'  
import {auth} from '../config/firebase' 
import { onAuthStateChanged, User} from 'firebase/auth'


const useAuthState = (): User | null => {
const [user, setUser] = useState<User | null>(null) 

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
})
return () => unsubscribe()
}, [])

return user
}

export default useAuthState