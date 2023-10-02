import { Link } from "react-router-dom";
import {FiLogIn} from 'react-icons/fi';

export function Header(){
  return(
    <div className="flex fixed justify-center w-full bg-black md:h-28">
      <nav className="flex justify-between w-full max-w-6xl mx-auto p-4 md:p-0 md:py-8">
        <div className="flex items-center text-white text-2xl md:text-4xl font-bold font-poppins">
          <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
        </div>

        <Link to={'/login'}>
          <FiLogIn size={28} color='#fff'/>
        </Link>
      </nav>
    </div>
  )
}