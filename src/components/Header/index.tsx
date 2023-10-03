import {useContext} from 'react';
import { AuthContext } from "../../contexts/AuthContext";

import { Link } from "react-router-dom";
import {FiLogIn, FiUser} from 'react-icons/fi';

export function Header(){
  const {signed, loadingAuth} = useContext(AuthContext)

  return(
    <div className="flex fixed justify-center w-full bg-black md:h-28">
      <header className="flex justify-between w-full max-w-6xl mx-auto p-4 md:p-0 md:py-8">
        
        <Link className="flex items-center text-white text-3xl md:text-4xl font-bold font-poppins" to={'/'}>
          Barber<span className="text-new-yellow">Shop</span>.
        </Link>
        

        {!loadingAuth && signed && (
          <Link className='flex items-center' to={'/clients'}>
              <FiUser size={28} color="#fff"/>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link className='flex items-center' to={'/login'}>
            <FiLogIn size={28} color='#fff'/>
          </Link>
        )}
      </header>
    </div>
  )
}