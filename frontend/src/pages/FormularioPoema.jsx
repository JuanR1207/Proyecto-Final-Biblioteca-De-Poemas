import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function FormularioPoema() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { esAdmin } = useAuth()
  const esEdicion = !!id

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    contenido: ''
  })

  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (esEdicion) {
      fetch(`https://proyecto-final-biblioteca-de-poemas.onrender.com/api/poemas/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
    }
  }, [id, esEdicion])

  const validar = () => {
    const nuevosErrores = {}
    if (!form.titulo) nuevosErrores.titulo = 'El título es obligatorio'
    if (!form.autor) nuevosErrores.autor = 'El autor es obligatorio'
    if (!form.categoria) nuevosErrores.categoria = 'La categoría es obligatoria'
    if (!form.contenido) nuevosErrores.contenido = 'El contenido es obligatorio'
    return nuevosErrores
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const url = esEdicion
      ? `https://proyecto-final-biblioteca-de-poemas.onrender.com/api/poemas/${id}`
      : 'https://proyecto-final-biblioteca-de-poemas.onrender.com/api/poemas'

    const method = esEdicion ? 'PUT' : 'POST'

    // ✅ usuario_id tomado del localStorage, no de usuarioActivo?.id
    const usuario_id = localStorage.getItem('usuario_id')

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, usuario_id })
    })
    .then(() => esAdmin ? navigate('/biblioteca') : navigate('/dashboard'))
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="p-10">
        <div className="max-w-2xl mx-auto bg-black bg-opacity-50 border border-orange-200 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">

          <h1 className="text-3xl font-bold text-orange-300 mb-8">
            {esEdicion ? '✏️ Editar Poema' : '✍️ Nuevo Poema'}
          </h1>

          <div className="flex flex-col gap-5">

            <div>
              <label className="text-gray-300 text-sm mb-1 block">Título</label>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
                placeholder="Título del poema"
              />
              {errores.titulo && <p className="text-red-400 text-sm mt-1">{errores.titulo}</p>}
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-1 block">Autor</label>
              <input
                name="autor"
                value={form.autor}
                onChange={handleChange}
                className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
                placeholder="Nombre del autor"
              />
              {errores.autor && <p className="text-red-400 text-sm mt-1">{errores.autor}</p>}
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-1 block">Categoría</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Amor">Amor</option>
                <option value="Naturaleza">Naturaleza</option>
                <option value="Tristeza">Tristeza</option>
                <option value="Alegría">Alegría</option>
                <option value="Reflexión">Reflexión</option>
              </select>
              {errores.categoria && <p className="text-red-400 text-sm mt-1">{errores.categoria}</p>}
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-1 block">Contenido</label>
              <textarea
                name="contenido"
                value={form.contenido}
                onChange={handleChange}
                rows={6}
                className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-500"
                placeholder="Escribe tu poema aquí..."
              />
              {errores.contenido && <p className="text-red-400 text-sm mt-1">{errores.contenido}</p>}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-orange-300 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition-all"
              >
                {esEdicion ? 'Guardar cambios' : 'Crear poema'}
              </button>
              <button
                onClick={() => esAdmin ? navigate('/biblioteca') : navigate('/dashboard')}
                className="border border-gray-400 text-gray-300 px-6 py-3 rounded-full hover:border-orange-300 hover:text-orange-300 transition-all"
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioPoema