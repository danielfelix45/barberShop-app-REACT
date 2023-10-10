import {useState, useEffect} from 'react';
import {FiSearch} from 'react-icons/fi'

import {collection, query, getDocs, orderBy, where} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

interface IClientsProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  uid: string;
}

function Home() {
  const [clients, setClients] = useState<IClientsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadClients();
  }, [])

  async function loadClients(){
    const clientsRef = collection(db, 'clients')
    const queryRef = query(clientsRef, orderBy('created', 'desc'))

    await getDocs(queryRef)
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
      setLoading(false);
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

  return (
    <div className="w-full h-screen bg-gray-500 px-2 pb-6">
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-black font-poppins font-semibold mt-28 md:mt-40 mb-14 md:mb-16">Lista de CLientes</h2>

        <div className='flex w-full items-center justify-center md:justify-end mb-8'>
          <input 
            className='px-2 py-2 rounded w-72 outline-none' 
            type="text" 
            placeholder='Procurar...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSearchClient} className='absolute -mr-60 md:mr-2 cursor-pointer'>
            <FiSearch size={25} color='#999' />
          </button>
        </div>

        {loading ? (
          <p className='font-semibold font-poppins text-3xl tracking-wider mt-20'>Carregando...</p>
        ) : clients.length > 0 ? (
          <div className='w-full shadow border rounded-lg overflow-hidden'>
            <table className="w-full leading-normal">
              <thead>
                <tr>
                  <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-widest">Nome</th>
                  <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-widest">E-mail</th>
                  <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-widest">Telefone</th>
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
        ) : (
          <div className='w-full shadow border rounded-lg overflow-hidden'>
            <table className="w-full leading-normal">
            <thead>
                <tr>
                  <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-widest">Nome</th>
                  <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-widest">E-mail</th>
                  <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-widest">Telefone</th>
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

export default Home;