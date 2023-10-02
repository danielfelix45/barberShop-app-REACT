import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-black px-2">

      <div className="flex items-center text-white text-4xl md:text-6xl font-bold font-poppins mt-12 md:mt-20">
        <Link to={'/'}>Barber<span className="text-new-yellow">Shop</span>.</Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-xl md:max-w-3xl mx-auto bg-gray-500 mt-14 md:mt-28 py-5 md:py-12 rounded">
        <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-5">Cadastro</h2>
        <form className="flex flex-col justify-center w-full md:max-w-xl px-2 gap-7 md:gap-10">
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="text"
            placeholder="Digite seu nome..." 
          />
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite seu e-mail..." 
          />
          <input 
            className="py-2 md:py-3 px-2 rounded outline-none"
            type="password"
            placeholder="Digite sua senha..." 
          />
          <button className="bg-new-yellow py-2 md:py-3 px-2 rounded font-poppins font-bold text-base md:text-xl text-gray-500">Cadastrar</button>
        </form>

        <p className="font-dm-sans font-medium text-base mt-4">Já tem uma conta? <a className="font-bold" href="/register">Faça seu login</a></p>
      </div>

    </div>
  )
}

export default Register;