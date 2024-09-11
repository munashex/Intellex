import { ThemeContext } from "../context/Theme"
import { useContext } from "react"
import { IoClose } from "react-icons/io5";
import { MdOutlineLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { MdOutlineTravelExplore } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { PiSignInLight } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom'

interface NavProps {
    onClick: () => void
}

const NavLinks = ({ onClick }: NavProps) => {
    const { theme, setTheme } = useContext(ThemeContext)
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname === path ? 'font-bold underline' : ''
    }
    

    return (
        <div className={`fixed top-0 z-20 right-0 w-[90%] shadow animate-fade-left md:w-1/2 lg:w-1/4 h-screen md:border-r ${theme === 'dark' ? 'bg-[#202222] text-white' : 'bg-gray-200'}`}>
            {/* close navlinks */}
            <div className='flex justify-end p-3'>
                <button><IoClose size={33} onClick={onClick} /></button>
            </div>

            {/* dark mode & light mode buttons */}
            <div className="flex justify-between p-3 mt-5">
                <div className="flex flex-row gap-x-2 items-center">
                    <span><MdOutlineLightMode size={26} /></span>
                    <h1>Appearance</h1>
                </div>

                <div className="flex flex-row gap-x-2">
                    <button onClick={() => setTheme('light')} className={theme === 'light' ? 'border p-1.5 border-blue-600 bg-blue-100 rounded-xl' : 'border p-1.5 rounded-xl'}>
                        <MdOutlineLightMode size={26} />
                    </button>
                    <button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'border p-1.5 border-white rounded-xl bg-blue-500' : 'border border-slate-400 rounded-xl p-1.5'}>
                        <MdOutlineNightlightRound size={26} />
                    </button>
                </div>
            </div>

            {/* navlinks */}
            <Link to="/" className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/')}`}>
                <span><CiHome size={28} /></span>
                <h1 className="text-lg">Home</h1>
            </Link>

            <Link to="/explore" className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/explore')}`}>
                <span><MdOutlineTravelExplore size={28} /></span>
                <h1 className="text-lg">Explore</h1>
            </Link>

            <Link to="/library" className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/library')}`}>
                <span><BiLibrary size={28} /></span>
                <h1 className="text-lg">Library</h1>
            </Link>

            <Link to="/signin" className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/signin')}`}>
                <span><PiSignInLight size={28} /></span>
                <h1 className="text-lg">Sign in</h1>
            </Link>
        </div>
    )
}

export default NavLinks