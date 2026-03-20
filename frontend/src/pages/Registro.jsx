import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Registro() {
  const navigate = useNavigate()
  const { registro } = useAuth()

  const [form, setForm] = useState({ usuario: '', contraseña: '', confirmar: '' })
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const validar = () => {
    const nuevosErrores = {}
    if (!form.usuario) nuevosErrores.usuario = 'El usuario es obligatorio'
    if (form.usuario.length < 3) nuevosErrores.usuario = 'Mínimo 3 caracteres'
    if (!form.contraseña) nuevosErrores.contraseña = 'La contraseña es obligatoria'
    if (form.contraseña.length < 6) nuevosErrores.contraseña = 'Mínimo 6 caracteres'
    if (!form.confirmar) nuevosErrores.confirmar = 'Confirma tu contraseña'
    if (form.contraseña !== form.confirmar) nuevosErrores.confirmar = 'Las contraseñas no coinciden'
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }
    const resultado = registro(form.usuario, form.contraseña)
    if (resultado.exito) {
      navigate('/dashboard')
    } else {
      setErrores({ usuario: resultado.mensaje })
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-teal-400 text-center mb-2">
          📚 Crear cuenta
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Regístrate para crear tus propios poemas
        </p>

        <div className="flex flex-col gap-5">

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Usuario</label>
            <input
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Elige un nombre de usuario"
            />
            {errores.usuario && <p className="text-red-400 text-sm mt-1">{errores.usuario}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Contraseña</label>
            <input
              name="contraseña"
              type="password"
              value={form.contraseña}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Mínimo 6 caracteres"
            />
            {errores.contraseña && <p className="text-red-400 text-sm mt-1">{errores.contraseña}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Confirmar contraseña</label>
            <input
              name="confirmar"
              type="password"
              value={form.confirmar}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Repite tu contraseña"
            />
            {errores.confirmar && <p className="text-red-400 text-sm mt-1">{errores.confirmar}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-teal-400 text-gray-950 px-6 py-3 rounded-full font-bold hover:bg-teal-300 w-full"
          >
            Crear cuenta
          </button>

          <p className="text-gray-400 text-center text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-teal-400 hover:underline">
              Inicia sesión
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Registro