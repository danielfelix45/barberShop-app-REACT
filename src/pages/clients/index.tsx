import {useState, useEffect, useContext} from 'react';

import { FiSearch, FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

import {collection, getDocs, where, query, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/AuthContext';

interface IClientsProps {
  id: string ;
  name: string;
  email: string;
  phone: string;
  uid: string;
}

function Clients(){
  const {user} = useContext(AuthContext);
  const [clients, setClients] = useState<IClientsProps[]>([]);


  useEffect(() => {
    function loadClients(){
      if(!user?.uid){
        return;
      }

      const clientsRef = collection(db, 'clients')
      const queryRef = query(clientsRef, where('uid', '==', user.uid))

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
  }, [user])

  async function handleDeleteClient(id: string){
    const docRef = doc(db, 'clients', id)
    await deleteDoc(docRef)
    setClients(clients.filter(client => client.id !== id))
  }

  return(
    <div className="w-full bg-gray-500 px-2 pt-24 md:pt-28">
      <div className="flex flex-col items-center h-screen w-full max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-5xl text-black font-poppins font-semibold mt-20 md:mt-20 mb-20 md:mb-24">Lista de CLientes</h2>

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
                <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Nome</th>
                <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">E-mail</th>
                <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Telefone</th>
                <th className="px-3 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Açoes</th>
              </tr>
            </thead>
            <tbody>
              {clients.map( client => (
                <tr key={client.id}>
                  <td className="py-4 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.name}</td>
                  <td className="py-4 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.email}</td>
                  <td className="py-4 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.phone}</td>
                  <td className="flex flex-col md:flex-row justify-start gap-10 py-4 px-4 border-b border-gray-200 bg-white">
                    <Link className="font-dm-sans font-semibold text-xs md:text-lg" to={`/clients/new/${client.id}`}>
                      <FiEdit size={23} color="#00ff" />
                    </Link>
                    <Link onClick={() => handleDeleteClient(client.id)} className="font-dm-sans font-semibold text-xs md:text-lg" to="#">
                      <FiTrash2 size={23} color="#ff000f" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  )
}

export default Clients;