import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Registro() {
  const navigate = useNavigate()
  const { registro } = useAuth()

  const [form, setForm] = useState({
    usuario: '',
    contraseña: '',
    confirmar: ''
  })

  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const validar = () => {
    const nuevosErrores = {}

    if (!form.usuario) {
      nuevosErrores.usuario = 'El usuario es obligatorio'
    } else if (form.usuario.length < 3) {
      nuevosErrores.usuario = 'Mínimo 3 caracteres'
    }

    if (!form.contraseña) {
      nuevosErrores.contraseña = 'La contraseña es obligatoria'
    } else if (form.contraseña.length < 6) {
      nuevosErrores.contraseña = 'Mínimo 6 caracteres'
    }

    if (!form.confirmar) {
      nuevosErrores.confirmar = 'Confirma tu contraseña'
    } else if (form.contraseña !== form.confirmar) {
      nuevosErrores.confirmar = 'Las contraseñas no coinciden'
    }

    return nuevosErrores
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const resultado = await registro(form.usuario, form.contraseña)

    if (resultado.exito) {
      alert('Usuario creado correctamente 🔥')
      navigate('/login')
    } else {
      setErrores({ usuario: resultado.mensaje || 'Error al registrar usuario' })
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
           Crear cuenta
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Regístrate para crear tus propios poemas
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Usuario</label>
            <input
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
              placeholder="Elige un nombre de usuario"
            />
            {errores.usuario && (
              <p className="text-red-400 text-sm mt-1">{errores.usuario}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Contraseña</label>
            <input
              name="contraseña"
              type="password"
              value={form.contraseña}
              onChange={handleChange}
              className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
              placeholder="Mínimo 6 caracteres"
            />
            {errores.contraseña && (
              <p className="text-red-400 text-sm mt-1">{errores.contraseña}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Confirmar contraseña</label>
            <input
              name="confirmar"
              type="password"
              value={form.confirmar}
              onChange={handleChange}
              className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
              placeholder="Repite tu contraseña"
            />
            {errores.confirmar && (
              <p className="text-red-400 text-sm mt-1">{errores.confirmar}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-orange-300 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 w-full transition-all"
          >
            Crear cuenta
          </button>

        </form>

        <p className="text-gray-300 text-center text-sm mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-orange-300 hover:underline">
            Inicia sesión
          </Link>
        </p>

        <p className="text-gray-300 text-center text-sm mt-2">
          <Link to="/" className="text-orange-300 hover:underline">
            ← Volver a la biblioteca pública
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Registro