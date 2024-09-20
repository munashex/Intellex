import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/Theme";
import { IoClose } from "react-icons/io5";
import { MdOutlineLightMode, MdOutlineNightlightRound, MdKeyboardArrowDown } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { MdOutlineTravelExplore } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { PiSignInLight } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';
import useAuthState from "../hooks/useAuthState";
import { collection, onSnapshot, where, query, DocumentData } from "firebase/firestore";  
import { db, auth } from '../config/firebase';
import { IoIosArrowRoundForward } from "react-icons/io";

interface NavProps {
    onClick: () => void;
}

interface PromptsTypes {
    id: string;
    answer: string;
    createAt: string;
    query: string;
    results: Array<{content: string, title: string, url: string}>;
    [key: string]: any;
}

const NavLinks: React.FC<NavProps> = ({ onClick }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [prompts, setPrompts] = useState<PromptsTypes[]>([]);
    const location = useLocation(); 
    const user = useAuthState();

    const isActive = (path: string) => {
        return location.pathname === path ? 'font-bold underline' : '';
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (auth.currentUser?.uid) {
            const q = query(collection(db, "prompts"), where("userId", "==", auth.currentUser.uid));
            
            const unsubscribe = onSnapshot(q, (snapShot) => {
                const promptsLists: PromptsTypes[] = snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data() as DocumentData,
                    answer: doc.data().answer || "",
                    createAt: doc.data().createAt || "",
                    query: doc.data().query || "",
                    results: doc.data().results || []
                }));
                setPrompts(promptsLists);
            });

            return () => unsubscribe();
        }
    }, []);

    return (
        <div 
            className={`fixed top-0 z-20 right-0 w-[90%] shadow-lg animate-fade-left md:w-1/2 lg:w-[24%] h-screen md:border-r ${
                theme === 'dark' ? 'bg-[#202222] text-white' : 'bg-gray-200'
            }`}
        >
            <div className='flex justify-end p-3'>
                <button>
                    <IoClose size={33} onClick={onClick} />
                </button>
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

            <Link 
                onClick={onClick}
                to="/" 
                className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/')}`}
            >
                <span><CiHome size={28} /></span>
                <h1 className="text-lg">Home</h1>
            </Link>

            <Link 
                onClick={onClick}
                to="/explore" 
                className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/explore')}`}
            >
                <span><MdOutlineTravelExplore size={28} /></span>
                <h1 className="text-lg">Explore</h1>
            </Link>

            {user ? (
                <div>
                <Link 
                    onClick={onClick}
                    to="/recents" 
                    className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/library')}`}
                >
                    <span><BiLibrary size={28} /></span>
                    <h1 className="text-lg">Recents</h1>
                </Link>

                  {/* user query history */}
                 <div className="p-3 -mt-5 flex flex-col gap-0.5"> 
                  {prompts.slice(0, 5).map((prompt) => (
                    <Link key={prompt.id} to="" className="hover:font-bold">{prompt.query.length  < 39 ? prompt.query : prompt.query.slice(0, 26) + '...'}</Link>
                  ))}
                  <Link to="/recents" onClick={onClick} className="mt-2  font-bold inline-flex items-center gap-1 underline underline-offset-4">View all <IoIosArrowRoundForward size={22}/></Link>
                 </div>

                </div>
            ) : null} 

            {!user ? (
                <Link 
                    onClick={onClick}
                    to="/signin" 
                    className={`p-3 flex items-center gap-x-3 mt-3 ${isActive('/signin')}`}
                >
                    <span><PiSignInLight size={28} /></span>
                    <h1 className="text-lg">Sign in</h1>
                </Link>
            ) : null}

            {user ? null: (
                <div className="mt-9 p-3"> 
                    <Link 
                        to="/signup" 
                        onClick={onClick} 
                        className="bg-[#0E9272] py-3 px-16 text-lg rounded-md text-white"
                    >
                        Sign up
                    </Link>
                </div>
            )}

           {user ? 
           (
            <div className="absolute bottom-5 p-3"> 
             <button className={`inline-flex items-center gap-x-1.5 p-2 rounded-lg ${theme === 'dark' ? 'bg-[#191A1A] border border-[#495555]' : 'bg-[#F7F7F8] border border-[#121215]'}`}>
                <span className="bg-[#0E9272] py-1 px-2 font-bold text-white rounded-full">{user.email?.at(0)?.toUpperCase()}</span> 
                <span>{user.email?.split('@')[0]}</span> 
                <span><MdKeyboardArrowDown size={25}/></span>
             </button>
            </div>
           ) : null}
        </div>
    );
};

export default NavLinks;