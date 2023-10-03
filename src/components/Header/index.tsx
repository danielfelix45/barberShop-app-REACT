import {useContext} from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';

import { Link } from "react-router-dom";
import {FiLogIn, FiLogOut} from 'react-icons/fi';

export function Header(){
  const {signed, loadingAuth} = useContext(AuthContext);

  async function handleLogout(){
    await signOut(auth);
  }

  return(
    <div className="flex fixed justify-center w-full bg-black md:h-28">
      <header className="flex justify-between w-full max-w-6xl mx-auto p-4 md:p-0 md:py-8">
        
        <Link className="flex items-center text-white text-3xl md:text-4xl font-bold font-poppins" to={'/'}>
          Barber<span className="text-new-yellow">Shop</span>.
        </Link>
        

        {!loadingAuth && signed && (
          <div className='flex items-center gap-20'>
            <Link className='text-white text-xl font-dm-sans font-semibold tracking-wide' to={'/clients'}>Lista de Clientes</Link>
            <Link className='text-white text-xl font-dm-sans font-semibold tracking-wide' to={'/clients/new'}>Cadastrar Cliente</Link>

            <Link to={'/'} onClick={handleLogout}>
              <FiLogOut size={28} color='#fff' />
            </Link>
          </div>
          
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