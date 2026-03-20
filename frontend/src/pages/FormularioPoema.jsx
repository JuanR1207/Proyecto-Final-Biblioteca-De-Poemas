import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function FormularioPoema() {
  const { id } = useParams()
  const navigate = useNavigate()
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
      fetch(`http://localhost:3000/api/poemas/${id}`)
        .then(res => res.json())
        .then(data => setForm(data))
    }
  }, [id])

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
      ? `http://localhost:3000/api/poemas/${id}`
      : 'http://localhost:3000/api/poemas'

    const method = esEdicion ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(() => navigate('/biblioteca'))
  }

  return (
    <div className="min-h-screen bg-gray-950 p-10">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-teal-400 mb-8">
          {esEdicion ? '✏️ Editar Poema' : '✍️ Nuevo Poema'}
        </h1>

        <div className="flex flex-col gap-5">
          
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Título</label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Título del poema"
            />
            {errores.titulo && <p className="text-red-400 text-sm mt-1">{errores.titulo}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Autor</label>
            <input
              name="autor"
              value={form.autor}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Nombre del autor"
            />
            {errores.autor && <p className="text-red-400 text-sm mt-1">{errores.autor}</p>}
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Categoría</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
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
            <label className="text-gray-400 text-sm mb-1 block">Contenido</label>
            <textarea
              name="contenido"
              value={form.contenido}
              onChange={handleChange}
              rows={6}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
              placeholder="Escribe tu poema aquí..."
            />
            {errores.contenido && <p className="text-red-400 text-sm mt-1">{errores.contenido}</p>}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-teal-400 text-gray-950 px-6 py-3 rounded-full font-bold hover:bg-teal-300"
            >
              {esEdicion ? 'Guardar cambios' : 'Crear poema'}
            </button>
            <button
              onClick={() => navigate('/biblioteca')}
              className="border border-gray-600 text-gray-400 px-6 py-3 rounded-full hover:border-teal-400 hover:text-teal-400"
            >
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FormularioPoema