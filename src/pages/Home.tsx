import blackLogo from '../images/blackLogo.png';
import whiteLogo from '../images/whiteLogo.png';
import { ThemeContext } from '../context/Theme';
import { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';

const Home = () => {
    // Get the current theme from the context
    const { theme } = useContext(ThemeContext);

    return (
        <div className="flex flex-col items-center gap-y-4">
            {/* Display logo based on the current theme */}
            <img 
                src={theme === 'light' ? whiteLogo : blackLogo} 
                className="w-40 md:w-64" 
                alt="Logo"
            />

            {/* Header text */}
            <h1 className="text-lg font-semibold text-center">
                The search engine that prioritizes your privacy and values you as a user.
            </h1>

            {/* Search input field */}
            <div className="w-full mx-auto md:max-w-lg lg:max-w-xl relative">
                <input
                    placeholder="Search"
                    className={`p-2 py-3 placeholder:text-lg rounded-lg w-full mt-4 ${
                        theme === 'light' ? 'bg-gray-200 outline-none' : 'bg-[#3C4148] outline-none'
                    }`}
                />
                <span className="absolute right-4 bottom-3.5">
                    <FiSearch size={25} />
                </span>
            </div>
        </div>
    );
};

export default Home;
