import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod';
import toast from "react-hot-toast";

import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";

const schema = z.object({
  name: z.string().min(1, {message: 'O campo nome é obrigatório'}). max(50, 'Nome muito extenso'),
  email: z.string({required_error: 'O campo email é obrigatório'}).email('Insira um email válido').toLowerCase(),
  password: z.string({required_error: 'O campo senha é obrigatório'}).min(6, 'A senha precisa de no mínimo 6 caracteres')
})

type FormData = z.infer<typeof schema>;

function Register() {
  const navigate = useNavigate();
  const { handleInfoUser } = useContext(AuthContext);
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth);
    }

    handleLogout();
  }, [])

  async function handleRegister(data: FormData){
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user) => {
      await updateProfile(user.user, {
        displayName: data.name
      })

      handleInfoUser({
        name: data.name,
        email: data.email,
        uid: user.user.uid
      })

      toast.success("Usuário cadastrado com sucesso!");
      navigate("/clients", {replace: true});
    })
    .catch((error) => {
      toast.error("Erro ao cadastrar usuário!");
      console.log(error);
    })
  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-black px-2">

      <div className="flex items-center text-white text-4xl md:text-6xl font-bold font-poppins mt-12 md:mt-16">
        <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl md:max-w-3xl mx-auto bg-gray-500 mt-14 md:mt-24 py-5 md:py-12 rounded">
        <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-5">Cadastro</h2>
        <form className="flex flex-col justify-center w-full md:max-w-xl px-2" onSubmit={handleSubmit(handleRegister)}>
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none text-lg"
            type="text"
            placeholder="Digite seu nome..." 
            {...register('name')}
          />
          {errors.name && <span className="m-1 text-red-600 text-lg">{errors.name.message}</span>}
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none mt-7 text-lg"
            type="email"
            placeholder="Digite seu e-mail..." 
            {...register('email')}
          />
          {errors.email && <span className="m-1 text-red-600 text-lg">{errors.email.message}</span>}
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none mt-7 text-lg"
            type="password"
            placeholder="Digite uma senha..." 
            {...register('password')}
          />
          {errors.password && <span className="m-1 text-red-600 text-lg">{errors.password.message}</span>}
          <button className="bg-new-yellow mt-7 py-2 md:py-3 px-2 rounded font-poppins font-bold text-base md:text-xl text-gray-500" type="submit">Cadastrar</button>
        </form>

        <p className="font-dm-sans font-medium text-base mt-4">Já tem uma conta? <a className="font-bold" href="/login">Faça seu login</a></p>
      </div>

    </div>
  )
}

export default Register;