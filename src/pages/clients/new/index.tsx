import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import { db } from "../../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

function New(){
  const {user} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  function handleSubmit(e: FormEvent){
    e.preventDefault();

    addDoc(collection(db, 'clients'), {
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
        <h2 className="mt-24 md:mt-28 mb-16 md:mb-20 font-poppins font-semibold text-2xl md:text-3xl">Cadastrar Novo Cliente</h2>
        <form className="flex flex-col w-full max-w-xl gap-10" onSubmit={handleSubmit}>
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

          <button className="bg-new-yellow py-3 px-2 rounded font-poppins font-bold text-xl text-gray-500">Cadastrar</button>
        </form>
      </div>

    </div>
  )
}

export default New;