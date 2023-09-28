

export function New(){
  return(
    <div className="w-full h-screen bg-gray-500 px-2 pt-28">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="mt-28 mb-20 font-poppins font-semibold text-3xl">Cadastrar Novo Cliente</h2>
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
          <button className="bg-new-yellow py-3 px-2 rounded font-poppins font-bold text-xl text-gray-500">Cadastrar</button>
        </form>
      </div>

    </div>
  )
}