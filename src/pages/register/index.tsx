import { Link } from "react-router-dom";

export function Register() {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-black">

      <div className="flex items-center text-white text-xl md:text-6xl font-bold font-poppins mt-20">
        <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto bg-gray-500 mt-24 py-12 rounded-sm">
        <h2 className="font-poppins font-semibold text-3xl mb-5">Cadastro</h2>
        <form className="flex flex-col w-full max-w-xl gap-10">
          <input 
            className="py-3 px-2 rounded outline-none"
            type="text"
            placeholder="Digite seu nome..." 
          />
          <input 
            className="py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite seu e-mail..." 
          />
          <input 
            className="py-3 px-2 rounded outline-none"
            type="password"
            placeholder="Digite sua senha..." 
          />
          <button className="bg-new-yellow py-3 px-2 rounded font-poppins font-bold text-xl text-gray-500">Cadastrar</button>
        </form>

        <p className="font-dm-sans font-medium text-base mt-5">Já tem uma conta? <a className="font-bold" href="/login">Faça login</a></p>
      </div>

    </div>
  )
}