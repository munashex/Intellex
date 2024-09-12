import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";
import { IoClose } from "react-icons/io5";
import { MdOutlineLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { MdOutlineTravelExplore } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { PiSignInLight } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';

interface NavProps {
    onClick: () => void;
}

const NavLinks: React.FC<NavProps> = ({ onClick }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'font-bold underline' : '';
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const navItems = [
        { path: "/", icon: CiHome, label: "Home" },
        { path: "/explore", icon: MdOutlineTravelExplore, label: "Explore" },
        { path: "/library", icon: BiLibrary, label: "Library" },
        { path: "/signin", icon: PiSignInLight, label: "Sign in" },
    ];

    return (
        <div className={`fixed top-0 z-20 right-0 w-[90%] shadow animate-fade-left md:w-1/2 lg:w-1/4 h-screen md:border-r ${theme === 'dark' ? 'bg-[#202222] text-white' : 'bg-gray-200'}`}>
            <div className='flex justify-end p-3'>
                <button><IoClose size={33} onClick={onClick} /></button>
            </div>

            <div className="flex justify-between p-3 mt-5">
                <div className="flex flex-row gap-x-2 items-center">
                    <span><MdOutlineLightMode size={26} /></span>
                    <h1>Appearance</h1>
                </div>

                <button 
                    onClick={toggleTheme} 
                    className={`p-1.5 rounded-xl ${
                        theme === 'light' 
                            ? 'border-black bg-white' 
                            : 'border-white black'
                    } border`}
                >
                    {theme === 'light' 
                        ? <MdOutlineLightMode size={26} /> 
                        : <MdOutlineNightlightRound size={26} />
                    }
                </button>
            </div>

            {navItems.map(({ path, icon: Icon, label }) => (
                <Link 
                    key={path}
                    to={path} 
                    className={`p-3 flex items-center gap-x-3 mt-3 ${isActive(path)}`}
                >
                    <span><Icon size={28} /></span>
                    <h1 className="text-lg">{label}</h1>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;