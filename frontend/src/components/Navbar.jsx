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
    <nav
      className="text-white px-8 py-4 border-b border-orange-400 border-opacity-40"
      style={{
        background: 'linear-gradient(135deg, rgba(194,65,12,0.6) 0%, rgba(0,0,0,0.85) 100%)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-orange-300 drop-shadow-md">
          📚 Biblioteca de Poemas
        </Link>

        
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-orange-300 focus:outline-none"
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
              <Link to="/dashboard" className="text-orange-100 hover:text-orange-300 transition-all font-medium">
                Inicio
              </Link>
              <Link to="/biblioteca" className="text-orange-100 hover:text-orange-300 transition-all font-medium">
                Biblioteca
              </Link>
              <Link
                to="/nuevo"
                className="bg-orange-500 bg-opacity-80 text-white px-4 py-1 rounded-full font-bold hover:bg-orange-400 transition-all shadow-md"
              >
                + Nuevo Poema
              </Link>
            </>
          )}
          <div className="flex items-center gap-3 border-l border-orange-400 border-opacity-40 pl-6">
            <span className="text-orange-200 text-sm font-medium">
              {esAdmin ? '👑' : '👤'} {usuarioActivo}
            </span>
            <button
              onClick={handleLogout}
              className="border border-red-400 text-red-300 px-4 py-1 rounded-full text-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      
      {menuAbierto && (
        <div
          className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-orange-400 border-opacity-30 pt-4"
          style={{
            background: 'linear-gradient(135deg, rgba(194,65,12,0.3) 0%, rgba(0,0,0,0.5) 100%)',
          }}
        >
          {esAdmin && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuAbierto(false)}
                className="text-orange-100 hover:text-orange-300 transition-all font-medium"
              >
                Inicio
              </Link>
              <Link
                to="/biblioteca"
                onClick={() => setMenuAbierto(false)}
                className="text-orange-100 hover:text-orange-300 transition-all font-medium"
              >
                Biblioteca
              </Link>
              <Link
                to="/nuevo"
                onClick={() => setMenuAbierto(false)}
                className="bg-orange-500 bg-opacity-80 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-400 text-center transition-all shadow-md"
              >
                + Nuevo Poema
              </Link>
            </>
          )}
          <div className="border-t border-orange-400 border-opacity-30 pt-4 flex flex-col gap-3">
            <span className="text-orange-200 text-sm font-medium">
              {esAdmin ? '👑' : '👤'} {usuarioActivo}
            </span>
            <button
              onClick={handleLogout}
              className="border border-red-400 text-red-300 px-4 py-2 rounded-full text-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition-all text-center"
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