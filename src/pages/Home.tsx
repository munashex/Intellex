import {useContext, useEffect, useRef, useState} from 'react'
import { ThemeContext } from '../context/Theme'
import { IoMdArrowForward } from "react-icons/io";  
import { prompts } from '../data/prompts'; 
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


function Home() {
    const {theme} = useContext(ThemeContext)
    const textInputRef = useRef<HTMLTextAreaElement>(null) 
    const navigate = useNavigate()
    const [search, setSearch] = useState('') 
  
   
    
    useEffect(() => {
     textInputRef.current?.focus()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearch(e.target.value);
    };
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!search.trim()) {
            toast.error('Please provide text');
            return;
        }

        if(search.length <= 4) {
          toast.error('Query too short. Minimum 5 characters.') 
          return
        }
        navigate(`/search/${search}`);
    };

  return (
    <div className="mt-10 lg:mt-16">
        {/* search textarea  */}
        <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-2xl  font-bold md:text-3xl lg:text-4xl">The start of enlightenment</h1>
          <form onSubmit={handleSubmit} className="w-full md:max-w-xl lg:max-w-3xl relative">
          <textarea onChange={handleChange}   ref={textInputRef}  placeholder="Ask me anything..." className={`h-32 p-4 placeholder:text-lg  w-full md:max-w-xl lg:max-w-3xl  rounded-md  outline-none ${theme === 'dark' ? 'border-gray-700 border bg-[#202222]' : 'border-2 border-gray-300 bg-[#F7F7F8]'}`}>

          </textarea> 
            <button type="submit" className={`absolute bottom-4 right-2 ${theme === 'light' ? 'bg-[#0E9272] text-white p-1.5 rounded-full': 'bg-[#0E9272] text-white  p-1.5 rounded-full'}`}>
            <IoMdArrowForward size={23}/>
            </button>
          </form>

        </div> 

        {/* defaults prompts */} 
        <div className="mt-4 grid grid-cols-1 gap-2 md:max-w-xl lg:max-w-3xl lg:grid-cols-2 mx-auto">
            {prompts.map((prompt) => (
                <div key={prompt.id} className={theme === 'light' ? 'border border-gray-300 p-1.5 rounded-md': 'border border-gray-700 p-1.5 rounded-md'}> 
                <button onClick={() => navigate(`/search/${prompt.name}`)}>{prompt.name}</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home