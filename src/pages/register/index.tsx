import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth);
    }

    handleLogout();
  }, [])

  async function handleRegister(e: FormEvent){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (user) => {
      await updateProfile(user.user, {
        displayName: name
      })

      console.log("CADASTRADO COM SUCESSO!");
      navigate("/clients", {replace: true});
    })
    .catch((error) => {
      console.log("ERRO AO CADASTRAR USUARIO!");
      console.log(error);
    })
  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-black px-2">

      <div className="flex items-center text-white text-4xl md:text-6xl font-bold font-poppins mt-12 md:mt-20">
        <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl md:max-w-3xl mx-auto bg-gray-500 mt-14 md:mt-28 py-5 md:py-12 rounded">
        <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-5">Cadastro</h2>
        <form className="flex flex-col justify-center w-full md:max-w-xl px-2 gap-7 md:gap-10" onSubmit={handleRegister}>
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="text"
            placeholder="Digite seu nome..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite seu e-mail..." 
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="password"
            placeholder="Digite sua senha..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-new-yellow py-2 md:py-3 px-2 rounded font-poppins font-bold text-base md:text-xl text-gray-500" type="submit">Cadastrar</button>
        </form>

        <p className="font-dm-sans font-medium text-base mt-4">Já tem uma conta? <a className="font-bold" href="/register">Faça seu login</a></p>
      </div>

    </div>
  )
}

export default Register;