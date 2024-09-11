import { useContext, useState } from "react"; 
import NavLinks from "./NavItems"; 
import blackLogo from '../images/blackLogo.png' 
import whiteLogo from '../images/whiteLogo.png' 
import { ThemeContext } from "../context/Theme"; 
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {

  const [openNav, setOpenNav] = useState(false) 
  const {theme} = useContext(ThemeContext)

   const handleNav = () => setOpenNav(!openNav)

  return (
    <div>
    <div className='flex justify-between  mx-4 md:mx-8 py-5 lg:mx-11'>
      <Link to="/">
      <img src={theme === 'light' ? whiteLogo : blackLogo} className="w-32 md:w-40"/>
      </Link>
      <button  onClick={handleNav}>
        <FaBars size={36}/> 
      </button>
    </div>  
      
    
    {openNav ? <NavLinks onClick={handleNav}/> : null}
    </div>
  )
}

export default Navbar