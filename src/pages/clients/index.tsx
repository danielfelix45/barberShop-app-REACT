import {useState, useEffect, useContext, useCallback} from 'react';
import { Link } from "react-router-dom";

import { FiSearch, FiTrash2, FiEdit, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

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
  const [input, setInput] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const recordsPage = clients.slice(firstIndex, lastIndex);
  const numberPage = Math.ceil(clients.length / recordsPerPage);
  const numbers = [...Array(numberPage + 1).keys()].slice(1)


  useEffect(() => {
    loadClients();
  }, [user])

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
  }

  async function handleSearchClient(){
    if(input === ''){
      loadClients()
      return;
    }

    setClients([]);

    const q = query(collection(db, 'clients'), 
      where('name', '>=', input.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')),
      where('name', '<=', input.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + '\uf8ff')
    )

    const querySnapshot = await getDocs(q)

    let clientsList = [] as IClientsProps[];

    querySnapshot.forEach((doc) => {
      clientsList.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        phone: doc.data().phone,
        uid: doc.data().uid
      })
    })

    setClients(clientsList);
  }


  async function handleDeleteClient(id: string){
    const docRef = doc(db, 'clients', id)
    await deleteDoc(docRef)
    setClients(clients.filter(client => client.id !== id))
  }

  function previewPage(){
    if(currentPage !== firstIndex){
      setCurrentPage(currentPage - 1)
    }else{
      return;
    }
  }

  function nextPage(){
    if(currentPage !== firstIndex){
      setCurrentPage(currentPage + 1)
    }
  }

  const records = useCallback((e: any) => {
    setRecordsPerPage(e.target.value)
    setCurrentPage(1);
  }, [])

  return(
    <div className="w-full min-h-screen bg-gray-500 px-2 pb-20">
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-black font-poppins font-semibold mt-28 md:mt-40 mb-14 md:mb-16">Lista de CLientes</h2>

        <div className='flex w-full items-center justify-center md:justify-end mb-8'>
          <input 
            className='px-2 py-2 rounded w-72 outline-none shadow-md shadow-gray-800' 
            type="text" 
            placeholder='Procurar...' 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearchClient} className='absolute -mr-60 md:mr-2 cursor-pointer'>
            <FiSearch size={25} color='#999' />
          </button>
        </div>

        <div className='w-full justify-start mb-2 pl-2'>
          <select className='focus:outline-none rounded px-3 py-1 shadow-md shadow-gray-800' onChange={records}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50
            </option>
          </select>
        </div>
        
        {loading ? (
          <p className='font-semibold font-poppins text-3xl tracking-wider'>Carregando...</p>
        ) : clients.length > 0 ? (
            <div className='w-full shadow-md shadow-gray-800 border rounded-lg overflow-hidden'>
              <table className="w-full leading-normal">
                <thead>
                  <tr>
                    <th className="text-left px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg uppercase tracking-wider">Nome</th>
                    <th className="text-left px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg uppercase tracking-wider">E-mail</th>
                    <th className="text-left px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg uppercase tracking-wider">Telefone</th>
                    <th className="text-left px-2 md:px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-xs md:text-lg uppercase tracking-wider">Açoes</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsPage.map(client => (
                    <tr key={client.id}>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.name}</td>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.email}</td>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">{client.phone}</td>
                      <td className="py-3 px-2 md:px-4 border-b border-gray-200 bg-white">
                        <div className='flex flex-col justify-center md:flex-row gap-5 md:gap-8'>
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
            <div className="flex bg-white rounded-lg font-[Poppins] mt-3 shadow-md shadow-gray-800">
              <button onClick={previewPage} className="flex items-center  gap-1 h-12 border-2 border-r-0 border-gray-700 px-4 rounded-l-lg hover:bg-gray-500 hover:font-semibold">
                <FiChevronsLeft size={22} color="#000" />
              </button>
              {
                  numbers.map((page, index) => (
                    <button key={index} onClick={() => setCurrentPage(page)} className={`h-12 border-2 border-r-0 border-gray-700
                    w-12 ${currentPage === page && 'bg-gray-500 text-black font-semibold'}`}>{page}</button>
                  ))
              }
              <button onClick={nextPage} className="flex items-center gap-1 h-12 border-2 border-gray-700 px-4 rounded-r-lg hover:bg-gray-500 hover:font-semibold">
                <FiChevronsRight size={22} color="#000" />
              </button>
            </div>
      </div>
    </div>
  )
}

export default Clients;