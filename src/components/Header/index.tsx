import { Link } from "react-router-dom";
import {FiLogIn} from 'react-icons/fi';

export function Header(){
  return(
    <div className="flex justify-center w-full bg-black">
      <nav className="flex justify-between w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="flex items-center text-white text-xl md:text-3xl font-bold font-poppins">
          <Link to={'#'}>Barber<span className="text-[#f1cd30]">Shop</span>.</Link>
        </div>

        <Link to={'/login'}>
          <FiLogIn size={30} color='#fff'/>
        </Link>
      </nav>
    </div>
  )
}