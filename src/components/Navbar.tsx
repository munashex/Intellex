import { CiSettings } from "react-icons/ci";
import { useState } from "react"; 
import NavLinks from "./NavItems";

const Navbar = () => {

  const [openNav, setOpenNav] = useState(false) 

   const handleNav = () => setOpenNav(!openNav)

  return (
    <div>
    <div className='flex justify-end mx-4 lg:mx-11 md:mx-8 py-5'> 
      <button className="border  border-slate-300 p-1 rounded-xl" onClick={handleNav}>
        <CiSettings size={32}/> 
      </button>
    </div>  
      
    
    {openNav ? <NavLinks onClick={handleNav}/> : null}
    </div>
  )
}

export default Navbar