import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.usuario || !form.contraseña) {
      setError('Por favor completa todos los campos')
      return
    }
    const exito = login(form.usuario, form.contraseña)
    if (exito) {
      navigate('/')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-teal-400 text-center mb-2">
          📚 Biblioteca de Poemas
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Inicia sesión para continuar
        </p>

        <div className="flex flex-col gap-5">

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Usuario</label>
            <input
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Contraseña</label>
            <input
              name="contraseña"
              type="password"
              value={form.contraseña}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="bg-teal-400 text-gray-950 px-6 py-3 rounded-full font-bold hover:bg-teal-300 w-full"
          >
            Iniciar Sesión
          </button>

          <div className="border border-gray-800 rounded-xl p-4 mt-2">
            <p className="text-gray-500 text-sm text-center mb-2">Usuarios de prueba</p>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-teal-400 text-sm font-bold">👑 Admin</p>
                <p className="text-gray-500 text-xs">usuario: admin</p>
                <p className="text-gray-500 text-xs">contraseña: admin123</p>
              </div>
              <div className="text-center">
                <p className="text-teal-400 text-sm font-bold">👤 Usuario</p>
                <p className="text-gray-500 text-xs">usuario: usuario</p>
                <p className="text-gray-500 text-xs">contraseña: 123456</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login