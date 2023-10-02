import {FiSearch} from 'react-icons/fi'

function Home() {
  return (
    <div className="w-full bg-gray-500 px-2 pt-28">
      <div className="flex flex-col items-center h-screen w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-black font-poppins font-semibold mt-10 md:mt-20 mb-24">Lista de CLientes</h2>

        <div className='flex w-full items-center justify-center md:justify-end  mb-8'>
          <input className='px-2 py-2 rounded w-72 outline-none' type="text" placeholder='Procurar...' />
          <div className='absolute -mr-60 md:mr-2 cursor-pointer'>
            <FiSearch size={25} color='#999' />
          </div>
        </div>
        
        <div className='w-full shadow rounded-lg overflow-hidden'>
          <table className="w-full leading-normal">
            <thead>
              <tr>
                <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-wider">Nome</th>
                <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-wider">E-mail</th>
                <th className=" px-4 py-2 border-b-2 border-gray-200 bg-gray-100 font-poppins font-semibold text-base md:text-lg text-left uppercase tracking-wider">Telefone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">Daniel Felix</td>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">felix@gmail.com</td>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">48 99837-1504</td>
              </tr>
              <tr>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">Maria</td>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">maria@email.com</td>
                <td className="py-4 px-4 border-b border-gray-200 bg-white font-dm-sans text-xs md:text-base">48 99585-5623</td>
              </tr>

            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  )
}

export default Home;