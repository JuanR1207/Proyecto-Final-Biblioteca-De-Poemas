import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ usuario: '', contraseña: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.usuario || !form.contraseña) {
      setError('Por favor completa todos los campos')
      return
    }

    const exito = await login(form.usuario, form.contraseña)

    if (exito) {
      navigate('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-black bg-opacity-50 border border-orange-200 rounded-2xl p-8 w-full max-w-md backdrop-blur-sm">

        <h1 className="text-3xl font-bold text-orange-300 text-center mb-2">
           Biblioteca de Poemas
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Usuario</label>
            <input
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Contraseña</label>
            <input
              name="contraseña"
              type="password"
              value={form.contraseña}
              onChange={handleChange}
              className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="bg-orange-300 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 w-full transition-all"
          >
            Iniciar Sesión
          </button>

          <p className="text-gray-300 text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-orange-300 hover:underline">
              Regístrate
            </Link>
          </p>

          <p className="text-gray-300 text-center text-sm">
            <Link to="/" className="text-orange-300 hover:underline">
              ← Volver a la biblioteca pública
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login