import { ThemeContext } from "../context/Theme" 
import { useContext } from "react"  
import { IoClose } from "react-icons/io5";
import { MdOutlineLightMode,  MdOutlineNightlightRound } from "react-icons/md"; 



interface NavProps {
    onClick: () => void
}

const NavLinks = ({onClick}: NavProps) => {
const {theme, setTheme} = useContext(ThemeContext)

    return (
    <div className={`fixed top-0 z-20 right-0 w-[90%] shadow animate-fade-left md:w-1/2 lg:w-1/4 h-screen md:border-r ${theme === 'dark' ? 'bg-[#3C4553] text-white' : 'bg-gray-200'}`}>
     
     <div className='flex justify-between p-3'>
      <h1 className="text-xl font-bold">Settings</h1>  
      <button><IoClose size={33} onClick={onClick}/></button>
    </div> 
    
     <div className="flex justify-between p-3 mt-5">
        <div className="flex flex-row gap-x-2">
        <span><MdOutlineLightMode size={26}/></span>
        <h1>Appearance</h1> 
        </div> 

        <div className="flex flex-row gap-x-2">
          <button onClick={() => setTheme('light')} className={theme === 'light' ? 'border p-1.5 border-blue-600 bg-blue-100 rounded-xl' : 'border p-1.5 rounded-xl'}>
          <MdOutlineLightMode size={26}/> 
          </button>
          <button onClick={() => setTheme('dark')}  className={theme === 'dark' ? 'border p-1.5 border-white rounded-xl bg-blue-500' : 'border border-slate-400 rounded-xl p-1.5'}>
            <MdOutlineNightlightRound size={26}/>
          </button>
        </div>
     </div>

    </div>
    )
}

export default NavLinks