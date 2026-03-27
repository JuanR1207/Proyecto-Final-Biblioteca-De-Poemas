import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { esAdmin, usuarioActivo } = useAuth()

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1518051870910-a46e30d9db16?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Hero */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-orange-300 mb-4">
          Bienvenido, {usuarioActivo?.usuario} 👑
        </h1>
        <p className="text-gray-300 text-xl mb-8">
          Administra y organiza todos los poemas de la biblioteca
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/biblioteca"
            className="bg-orange-300 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition-all"
          >
            Ver Biblioteca
          </Link>
          {esAdmin && (
            <Link
              to="/nuevo"
              className="border-2 border-orange-300 text-orange-300 px-6 py-3 rounded-full font-bold hover:bg-orange-300 hover:text-black transition-all"
            >
              + Nuevo Poema
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black bg-opacity-50 rounded-2xl p-6 text-center border border-orange-200 border-opacity-30 backdrop-blur-sm hover:border-orange-300 transition-all">
          <div className="text-4xl mb-3">✍️</div>
          <h3 className="text-lg font-bold text-orange-300 mb-2">Escribe</h3>
          <p className="text-gray-400">Crea nuevos poemas y compártelos</p>
        </div>
        <div className="bg-black bg-opacity-50 rounded-2xl p-6 text-center border border-orange-200 border-opacity-30 backdrop-blur-sm hover:border-orange-300 transition-all">
          <div className="text-4xl mb-3">📖</div>
          <h3 className="text-lg font-bold text-orange-300 mb-2">Explora</h3>
          <p className="text-gray-400">Navega por todos los poemas guardados</p>
        </div>
        <div className="bg-black bg-opacity-50 rounded-2xl p-6 text-center border border-orange-200 border-opacity-30 backdrop-blur-sm hover:border-orange-300 transition-all">
          <div className="text-4xl mb-3">🗂️</div>
          <h3 className="text-lg font-bold text-orange-300 mb-2">Organiza</h3>
          <p className="text-gray-400">Filtra y organiza por categorías</p>
        </div>
      </div>
    </div>
  )
}

export default Home