import {useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";

import { FiSearch, FiTrash2, FiEdit } from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);


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
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(true);
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
    <div className="w-full h-screen bg-gray-500 px-2 pb-6 md:pb-0">
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-black font-poppins font-semibold mt-28 md:mt-40 mb-14 md:mb-16">Lista de CLientes</h2>

        <div className='flex w-full items-center justify-center md:justify-end mb-8'>
              <input className='px-2 py-2 rounded w-72 outline-none' type="text" placeholder='Procurar...' />
              <div className='absolute -mr-60 md:mr-2 cursor-pointer'>
                <FiSearch size={25} color='#999' />
              </div>
            </div>
        
        {loading ? (
          <p className='font-semibold font-poppins text-3xl tracking-wider'>Carregando...</p>
        ) : clients.length > 0 ? (
            <div className='w-full shadow border rounded-lg overflow-hidden'>
              <table className="w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Nome</th>
                    <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">E-mail</th>
                    <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Telefone</th>
                    <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Açoes</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id}>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.name}</td>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.email}</td>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.phone}</td>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white">
                        <div className='flex flex-col md:flex-row gap-5 md:gap-8'>
                          <Link to={`/clients/new/${client.id}`}>
                            <FiEdit size={25} color="#00ff" />
                          </Link>
                          <Link onClick={() => handleDeleteClient(client.id)} to="#">
                            <FiTrash2 size={25} color="#ff000f" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='w-full shadow border rounded-lg overflow-hidden'>
              <table className="w-full leading-normal">
                <thead>
                    <tr>
                      <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Nome</th>
                      <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">E-mail</th>
                      <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Telefone</th>
                      <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg text-left uppercase tracking-wider">Açoes</th>
                    </tr>
                  </thead>
              </table>
              <div className='w-full py-4 bg-white text-center font-poppins font-semibold text-base md:text-lg'>
                <p>Não há clientes cadastrados</p>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Clients;