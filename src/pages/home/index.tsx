import {useState, useEffect} from 'react';
import {FiSearch} from 'react-icons/fi'

import {collection, query, getDocs, orderBy} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

interface IClientsProps {
  id: string | number;
  name: string | null;
  email: string | null;
  phone: string | number;
  uid: string | number;
}

function Home() {
  const [clients, setClients] = useState<IClientsProps[]>([]);

  useEffect(() => {

    function loadClients(){
      const clientsRef = collection(db, 'clients')
      const queryRef = query(clientsRef, orderBy('created', 'desc'))

      getDocs(queryRef)
      .then((snapshot) => {
        let clientsList = [] as IClientsProps[];

        snapshot.forEach( doc => {
          clientsList.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            uid: doc.data().uid
          })
        })

        setClients(clientsList);
      })
    }

    loadClients();
  }, [])

  return (
    <div className="w-full bg-gray-500 px-2 pt-28">
      <div className="flex flex-col items-center h-screen w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-black font-poppins font-semibold mt-10 md:mt-20 mb-24">Lista de CLientes</h2>

        <div className='flex w-full items-center justify-center md:justify-end  mb-8'>
          <input className='px-2 py-2 rounded w-72 outline-none' type="text" placeholder='Procurar...' />
          <div className='absolute -mr-60 md:mr-2 cursor-pointer'>
            <FiSearch size={25} color='#999' />
          </div>
        </div>
        
        <div className='w-full shadow rounded-lg overflow-hidden'>
          <table className="w-full leading-normal">
            <thead>
              <tr>
                <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-wider">Nome</th>
                <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-wider">E-mail</th>
                <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-wider">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {clients.map( client => (
                <tr key={client.id}>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.name}</td>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.email}</td>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  )
}

export default Home;