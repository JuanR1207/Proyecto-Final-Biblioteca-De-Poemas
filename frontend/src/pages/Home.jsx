import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { esAdmin } = useAuth()

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-teal-400 mb-4">
          Bienvenido a la Biblioteca 📚
        </h1>
        <p className="text-gray-400 text-xl mb-8">
          Un lugar para guardar, compartir y descubrir poemas
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/biblioteca"
            className="bg-teal-400 text-gray-950 px-6 py-3 rounded-full font-bold hover:bg-teal-300"
          >
            Ver Poemas
          </Link>
          {esAdmin && (
            <Link
              to="/nuevo"
              className="border-2 border-teal-400 text-teal-400 px-6 py-3 rounded-full font-bold hover:bg-teal-400 hover:text-gray-950"
            >
              + Nuevo Poema
            </Link>
          )}
        </div>
      </div>

      {/* Tarjetas informativas */}
      <div className="max-w-4xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-2xl p-6 shadow text-center border border-gray-800">
          <div className="text-4xl mb-3">✍️</div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">Escribe</h3>
          <p className="text-gray-400">Crea tus propios poemas y guárdalos</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow text-center border border-gray-800">
          <div className="text-4xl mb-3">📖</div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">Explora</h3>
          <p className="text-gray-400">Navega por todos los poemas guardados</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-6 shadow text-center border border-gray-800">
          <div className="text-4xl mb-3">🗂️</div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">Organiza</h3>
          <p className="text-gray-400">Filtra por categorías fácilmente</p>
        </div>
      </div>

    </div>
  )
}

export default Home