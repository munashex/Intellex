import { useContext } from "react" 
import { ThemeContext } from "../context/Theme"
import { FcGoogle } from "react-icons/fc";
import  {Link} from 'react-router-dom'
import {useState} from 'react'
import {auth} from '../config/firebase' 
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth' 
import Loader from "../components/Loader";
import React from 'react' 
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

function SignUp() {

const {theme} = useContext(ThemeContext) 
const [email, setEmail] = useState('') 
const [password, setPassword] = useState('')  
const [loading, setLoading]  = useState(false) 
const navigate = useNavigate()
const provider = new GoogleAuthProvider() 

const HandleSignUpWithGoogle = () => {
 signInWithPopup(auth, provider)
 .then(() => {
  if(auth.currentUser) {
    navigate('/')
  }
 })
 .catch((err) => console.log(err))
}

const HandleSignUp = async(e: React.FormEvent<HTMLFormElement>) => {
  try{
  e.preventDefault() 
  setLoading(true)
  if(password.trim()) {
   setLoading(true)
   await createUserWithEmailAndPassword(auth, email, password) 
   setLoading(false)
   navigate('/')
  }
  }catch(err: any) {
   toast.error(err.message.split(' ')[2])
  }finally{
    setLoading(false)
  }
}


  return (
    <div className="py-12 md:max-w-lg  mx-auto">
    <h1 className="text-2xl md:text-3xl text-center font-bold">Create an account</h1> 
    
    {/* signin with email and password here */}
    <form className="flex flex-col gap-y-5 mt-5" onSubmit={HandleSignUp}>
     <input 
     className={`py-3 with-full rounded-md p-2 outline-none ${theme === 'dark' ? 'border-gray-700 border bg-[#202222]' : 'border border-gray-300 bg-[#F7F7F8]'}`} 
     placeholder="Email Address" 
     type="email"
     onChange={(e) => setEmail(e.target.value)}
     required
     /> 

     <input 
     className={`py-3 with-full rounded-md p-2 outline-none ${theme === 'dark' ? 'border-gray-700 border bg-[#202222]' : 'border border-gray-300 bg-[#F7F7F8]'}`} 
     placeholder="Password" 
     type="password"
     onChange={(e) => setPassword(e.target.value)}
     required
     /> 

     <button type="submit" className="bg-[#0E9272] hover:bg-[#125d4a] p-2 py-3 rounded-md text-white text-lg"> 
        {loading ?  <Loader/> : "Continue"}
      </button>
    </form> 

      <div className="flex flex-row mt-2.5 gap-x-2.5 items-center justify-center">
        <h1>Already have an account?</h1> 
        <Link to="/signin" className="text-[#0E9272]">Login</Link>
      </div>
    
     {/* sign with google or facebook */}
    <div className="mt-11 flex flex-col gap-y-5">
      <button onClick={HandleSignUpWithGoogle} className={`flex flex-row justify-center py-2 w-full rounded-md items-center gap-x-4 ${theme === 'dark' ? 'border-gray-700 border hover:bg-[#202222]' : 'border border-gray-300 hover:bg-[#F7F7F8]'}`}>
        <FcGoogle size={25}/> 
        <h1 className="text-lg font-semibold">Continue with Google</h1>
      </button> 
    </div>

    </div>
  )
}

export default SignUp