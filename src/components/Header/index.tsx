import {useContext, useState} from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';

import { Link } from "react-router-dom";
import {FiLogIn, FiLogOut, FiMenu} from 'react-icons/fi';

export function Header(){
  const {signed, loadingAuth} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout(){
    await signOut(auth);
  }

  function toggleMenu(){
    setIsOpen(!isOpen);
  }

  return(
    <header className="flex fixed z-10 justify-center w-full bg-black md:h-28">
      <div className="flex justify-between w-full max-w-7xl mx-auto p-4 md:p-0 md:py-8">
        <Link className="flex items-center text-white text-3xl md:text-4xl font-bold font-poppins" to={'/'}>
          Barber<span className="text-new-yellow">Shop</span>.
        </Link>
        
        <nav className={`flex items-center bg-black md:static absolute min-h[45vh] left-0 ${isOpen ? 'top-[100%] transition-all duration-300 delay-75' : 'top-[-420%] transition-all duration-500 delay-75'} md:w-auto w-full px-5 border-t md:border-t-0 border-gray-800 drop-shadow-sm md:drop-shadow-none`}>
        {!loadingAuth && signed && (
          <div className='w-full flex flex-col md:flex-row items-center gap-5 md:gap-20 py-5'>
            <Link className='w-full md:w-auto text-white text-sm md:text-xl font-dm-sans font-semibold tracking-wide border-b md:border-b-0 border-gray-800 pb-5 md:pb-0' to={'/clients'} onClick={toggleMenu}>Lista de Clientes</Link>
            <Link className='w-full md:w-auto text-white text-sm md:text-xl font-dm-sans font-semibold tracking-wide border-b md:border-b-0 border-gray-800 pb-5 md:pb-0' to={'/clients/new'} onClick={toggleMenu}>Cadastrar Cliente</Link>

            <Link className='flex items-center justify-start p-2' to={'/'} onClick={handleLogout}>
              <FiLogOut size={28} color='#fff' />
            </Link>
          </div>          
        )}

        {!loadingAuth && !signed && (
          <Link className='flex items-center justify-center p-2' to={'/login'}>
            <FiLogIn size={28} color='#fff'/>
          </Link>
        )}

        </nav>
        <button onClick={toggleMenu} className='md:hidden'>
          <FiMenu size={28} color="#fff" />
        </button>
      </div>
    </header>
  )
}