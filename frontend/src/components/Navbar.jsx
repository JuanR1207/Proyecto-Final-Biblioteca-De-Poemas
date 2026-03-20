import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { usuarioActivo, logout, esAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMenuAbierto(false)
  }

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 border-b border-teal-400">

      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          📚 Biblioteca de Poemas
        </Link>

        {/* Botón hamburguesa - solo visible en móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-teal-400 focus:outline-none"
        >
          {menuAbierto ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menú desktop */}
        <div className="hidden md:flex gap-6 items-center">
          {esAdmin && (
            <>
              <Link to="/" className="text-gray-300 hover:text-teal-400">
                Inicio
              </Link>
              <Link to="/biblioteca" className="text-gray-300 hover:text-teal-400">
                Biblioteca
              </Link>
              <Link to="/nuevo" className="bg-teal-400 text-gray-950 px-4 py-1 rounded-full font-bold hover:bg-teal-300">
                + Nuevo Poema
              </Link>
            </>
          )}
          <div className="flex items-center gap-3 border-l border-gray-700 pl-6">
            <span className="text-gray-400 text-sm">
              {esAdmin ? '👑' : '👤'} {usuarioActivo?.usuario}
            </span>
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-1 rounded-full text-sm hover:bg-red-500 hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Menú hamburguesa móvil */}
      {menuAbierto && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-gray-800 pt-4">
          {esAdmin && (
            <>
              <Link
                to="/"
                onClick={() => setMenuAbierto(false)}
                className="text-gray-300 hover:text-teal-400"
              >
                Inicio
              </Link>
              <Link
                to="/biblioteca"
                onClick={() => setMenuAbierto(false)}
                className="text-gray-300 hover:text-teal-400"
              >
                Biblioteca
              </Link>
              <Link
                to="/nuevo"
                onClick={() => setMenuAbierto(false)}
                className="bg-teal-400 text-gray-950 px-4 py-2 rounded-full font-bold hover:bg-teal-300 text-center"
              >
                + Nuevo Poema
              </Link>
            </>
          )}
          <div className="border-t border-gray-800 pt-4 flex flex-col gap-3">
            <span className="text-gray-400 text-sm">
              {esAdmin ? '👑' : '👤'} {usuarioActivo?.usuario}
            </span>
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-sm hover:bg-red-500 hover:text-white text-center"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar