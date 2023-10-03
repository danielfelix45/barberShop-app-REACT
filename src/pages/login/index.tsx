import { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth);
    }

    handleLogout();
  }, [])

  function handleSubmit(e: FormEvent){
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("LOGADO COM SUCESSO!")
      navigate("/clients", {replace: true})
      console.log(user)
    })
    .catch((error) => {
      console.log("ERRO AO LOGAR!")
      console.log(error)
    })

  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-black px-2">

      <div className="flex items-center text-white text-4xl md:text-6xl font-bold font-poppins mt-12 md:mt-20">
        <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl md:max-w-3xl mx-auto bg-gray-500 mt-20 md:mt-28 py-6 md:py-12 rounded">
        <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-5">Login</h2>
        <form className="flex flex-col justify-center w-full md:max-w-xl px-2 gap-7 md:gap-10" onSubmit={handleSubmit}>
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite seu e-mail..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="password"
            placeholder="Digite sua senha..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-new-yellow py-2 md:py-3 px-2 rounded font-poppins font-bold text-base md:text-xl text-gray-500" type="submit">Acessar</button>
        </form>

        <p className="font-dm-sans font-medium text-base mt-4">Ainda não tem uma conta? <a className="font-bold" href="/register">Faça seu cadastro</a></p>
      </div>

    </div>
  )
}

export default Login;