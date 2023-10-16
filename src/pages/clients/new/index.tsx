import { useState, useEffect, useContext } from "react";
import {useNavigate, useParams} from 'react-router-dom';

import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { z } from "zod";
import toast from "react-hot-toast";

import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../services/firebaseConnection";
import { addDoc, collection, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório').max(50, 'nome muito extenso, máximo 50 caracteres'),
  email: z.string().toLowerCase().email('Digite um email válido'),
  phone: z.string().min(1, 'O campo telefone é obrigatório')
})

type FormData = z.infer<typeof schema>;

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
  const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const [clients, setClients] = useState<IClientsProps[]>([]);
  const [idClient, setIdClient] = useState(false);

  useEffect(() => {
    async function loadClients(){
      const clientsRef = collection(db, 'clients')
      await getDocs(clientsRef)
      .then((snapshot) => {
        let clientsList = [] as IClientsProps[];

        snapshot.forEach((doc) => {
          clientsList.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            uid: doc.data().uid
          })
        })

        setClients(clientsList)
      
        if(id){
          loadId(clientsList)
        }
      })
      .catch((error) => {
        console.log(error);
        setClients([]);
      })
    }

    loadClients();
  }, [id])

  async function loadId(clientsList: IClientsProps[]){
    const docRef = doc(db, 'clients', id as string)
    await getDoc(docRef)
    .then((snapshot) => {
      setValue('name', snapshot.data()?.name),
      setValue('email', snapshot.data()?.email)
      setValue('phone', snapshot.data()?.phone)

      setIdClient(true);
    })
    .catch((error) => {
      console.log(error)
      setIdClient(false);
    })

  }


  async function handleRegister(data: FormData){
    if(idClient){
      const docRef = doc(db, 'clients', id as string)
      await updateDoc(docRef, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        created: new Date(),
        owner: user?.name,
        uid: user?.uid
      })
      .then(() => {
        reset();
        toast.success('Cliente atualizado com sucesso!')
        navigate('/clients', {replace: true})
      })
      .catch((error) => {
        console.log(error)
        toast.error("Erro ao atualizar os dados do cliente!")
      })

      return; 
    }

    await addDoc(collection(db, 'clients'), {
      name: data.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      email: data.email,
      phone: data.phone,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid
    })
    .then(() => {
      reset();
      toast.success("Cliente cadastrado com sucesso!")
    })
    .catch((error) => {
      console.log(error);
      toast.error("Erro ao cadastrar cliente!")
    })
  }

  return(
    <div className="w-full bg-gray-500 px-2">
      <div className="flex flex-col items-center md:items-start w-full max-w-7xl mx-auto h-screen md:pt-28">
        <h2 className="mt-24 mb-14 md:mb-20 font-poppins font-semibold text-2xl md:text-4xl">{id ? "Editar CLiente" : "Novo Cliente"}</h2>
        <form className="flex flex-col w-full max-w-xl" onSubmit={handleSubmit(handleRegister)}>
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="text"
            placeholder="Digite o nome do cliente..." 
            {...register("name")}
          />
          {errors.name && <span className="mt-1 text-red-600 text-lg">{errors.name.message}</span>}
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none mt-5 md:mt-10"
            type="email"
            placeholder="Digite o e-mail do cliente..." 
            {...register('email')}
          />
          {errors.email && <span className="mt-1 text-red-600 text-lg">{errors.email.message}</span>}
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none mt-5 md:mt-10"
            type="tel"
            placeholder="Digite o telefone do cliente..." 
            {...register('phone')}
          />
          {errors.phone && <span className="mt-1 text-red-600 text-lg">{errors.phone.message}</span>}

          <button type="submit" className="bg-new-yellow py-2 md:py-3 px-2 mt-10 md:mt-12 rounded font-poppins font-bold text-xl text-gray-500">{id ? "Atualizar" : "Cadastrar"}</button>
        </form>
      </div>

    </div>
  )
}

export default New;