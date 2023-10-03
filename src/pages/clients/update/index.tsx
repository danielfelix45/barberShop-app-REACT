
function Update(){
  return(
    <div className="w-full bg-gray-500 px-2 md:pt-28">
      <div className="flex flex-col items-center md:items-start w-full max-w-6xl mx-auto h-screen">
        <h2 className="mt-24 md:mt-28 mb-16 md:mb-20 font-poppins font-semibold text-2xl md:text-3xl">Atualizar Cliente</h2>
        <form className="flex flex-col w-full max-w-xl gap-10">
          <input 
            className="py-3 px-2 rounded outline-none"
            type="text"
            placeholder="Digite o nome do cliente..." 
          />
          <input 
            className="py-3 px-2 rounded outline-none"
            type="email"
            placeholder="Digite o e-mail do cliente..." 
          />
          <input 
            className="py-3 px-2 rounded outline-none"
            type="tel"
            placeholder="Digite o telefone do cliente..." 
          />
          <button className="bg-new-yellow py-3 px-2 rounded font-poppins font-bold text-xl text-gray-500">Atualizar</button>
        </form>
      </div>

    </div>
  )
}

export default Update;