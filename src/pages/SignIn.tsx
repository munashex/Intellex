import { useContext } from "react" 
import { ThemeContext } from "../context/Theme"

function SignIn() {

    const {theme} = useContext(ThemeContext)

  return (
    <div className="py-12 md:max-w-lg  mx-auto">
    <h1 className="text-2xl md:text-3xl text-center font-bold">Welcome back</h1> 
    
    {/* signin with email and password here */}
    <form className="flex flex-col gap-y-5 mt-5">
     <input 
     className={`py-3 with-full rounded-md p-2 outline-none ${theme === 'dark' ? 'border-gray-700 border bg-[#202222]' : 'border border-gray-300 bg-[#F7F7F8]'}`} 
     placeholder="Email Address" 
     type="email"/> 

     <input 
     className={`py-3 with-full rounded-md p-2 outline-none ${theme === 'dark' ? 'border-gray-700 border bg-[#202222]' : 'border border-gray-300 bg-[#F7F7F8]'}`} 
     placeholder="Password" 
     type="password"/> 

     <button type="submit" className="bg-[#0E9272] hover:bg-[#125d4a] p-2 py-3 rounded-md text-white text-lg">Log in</button>
    </form> 

    

    <div>
        
    </div>

    </div>
  )
}

export default SignIn