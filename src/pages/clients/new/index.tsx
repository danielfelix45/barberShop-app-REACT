import { FormEvent, useState, useEffect, useContext } from "react";
import {useNavigate, useParams} from 'react-router-dom';

import { AuthContext } from "../../../contexts/AuthContext";

import { db } from "../../../services/firebaseConnection";
import { addDoc, collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";

interface IClientsProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  uid: string;
}

function New(){
  const {user} = useContext(AuthContext);
  const {id} = useParams();
  const navigate = useNavigate();

  const [clients, setClients] = useState<IClientsProps[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idClient, setIdClient] = useState(false);

  useEffect(() => {
    async function loadClients(){
      const clientsRef = collection(db, 'clients')
      await getDocs(clientsRef)
      .then((snapshot) => {
        let clientList = [] as IClientsProps[];

        snapshot.forEach((doc) => {
          clientList.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            uid: doc.data().uid
          })
        })

        setClients(clientList)

      
        if(id){
          loadId(clientList)
        }
        
      })
      .catch((error) => {
        console.log(error);
        setClients([]);
      })
    }

    loadClients();
  }, [id])

  async function loadId(clientList: IClientsProps[]){
    const docRef = doc(db, 'clients', id)
    await getDoc(docRef)
    .then((snapshot) => {
      setName(snapshot.data()?.name)
      setEmail(snapshot.data()?.email)
      setPhone(snapshot.data()?.phone)

      setIdClient(true);
    })
    .catch((error) => {
      console.log(error)
      setIdClient(false);
    })

  }


  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if(idClient){
      const docRef = doc(db, 'clients', id)
      await updateDoc(docRef, {
        name: name,
        email: email,
        phone: phone,
        created: new Date(),
        owner: user?.name,
        uid: user?.uid
      })
      .then(() => {
        setName('')
        setEmail('')
        setPhone('')
        navigate('/clients', {replace: true})
      })
      .catch((error) => {
        console.log(error)
      })

      return; 
    }

    await addDoc(collection(db, 'clients'), {
      name: name,
      email: email,
      phone: phone,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid
    })
    .then(() => {
      console.log("CLIENTE CADASTRADO COM SUCESSO!")
      setName('');
      setEmail('');
      setPhone('');
    })
    .catch((error) => {
      console.log(error);
      console.log("ERRO AO CADASTRAR CLIENTE!")
    })
  }

  return(
    <div className="w-full bg-gray-500 px-2 md:pt-28">
      <div className="flex flex-col items-center md:items-start w-full max-w-6xl mx-auto h-screen">
        <h2 className="mt-24 md:mt-28 mb-16 md:mb-20 font-poppins font-semibold text-2xl md:text-4xl">Novo Cliente</h2>
        <form className="flex flex-col w-full max-w-xl gap-10" onSubmit={handleRegister}>
          <input 
            className="py-3 px-2 rounded outline-none"
            type="text"
            placeholder="Digite o nome do cliente..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            className="py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite o e-mail do cliente..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className="py-3 px-2 rounded outline-none"
            type="tel"
            placeholder="Digite o telefone do cliente..." 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" className="bg-new-yellow py-3 px-2 rounded font-poppins font-bold text-xl text-gray-500">Cadastrar</button>
        </form>
      </div>

    </div>
  )
}

export default New;