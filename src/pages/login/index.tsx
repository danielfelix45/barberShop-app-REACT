import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

const schema = z.object({
  email: z.string({required_error: 'O campo email é obrigatório'}).email('Insira um email válido').toLowerCase(),
  password: z.string({required_error: 'O campo senha é obrigatório'}).min(6, 'A senha precisa de no mínimo 6 caracteres')
})

type FormData = z.infer<typeof schema>;

function Login() {
  const navigate = useNavigate();
  const {register, handleSubmit: onSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth);
    }

    handleLogout();
  }, [])

  function handleSubmit(data: FormData){
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      console.log("LOGADO COM SUCESSO!")
      navigate("/clients", {replace: true})
    })
    .catch((error) => {
      console.log("ERRO AO LOGAR!")
      console.log(error)
    })

  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-black px-2">
      <div className="flex items-center text-white text-4xl md:text-7xl font-bold font-poppins mt-12 md:mt-24">
        <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl md:max-w-3xl mx-auto bg-gray-500 mt-20 md:mt-32 py-6 md:py-12 rounded">
        <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-5">Login</h2>
        <form className="flex flex-col justify-center w-full md:max-w-xl px-2" onSubmit={onSubmit(handleSubmit)}>
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite seu e-mail..." 
            {...register('email')}
          />
          {errors.email && <span className="m-1 text-red-600 text-base">{errors.email.message}</span>}
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none mt-7 md:mt-10"
            type="password"
            placeholder="Digite sua senha..." 
            {...register('password')}
          />
          {errors.password && <span className="m-1 text-red-600 text-base">{errors.password.message}</span>}
          <button className="bg-new-yellow mt-7 md:mt-10 py-2 md:py-3 px-2 rounded font-poppins font-bold text-base md:text-xl text-gray-500" type="submit">Acessar</button>
        </form>

        <p className="font-dm-sans font-medium text-base mt-4">Ainda não tem uma conta? <a className="font-bold" href="/register">Faça seu cadastro</a></p>
      </div>

    </div>
  )
}

export default Login;