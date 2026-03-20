import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePoemas } from '../context/PoemasContext'
import { useAuth } from '../context/AuthContext'

function DetallePoema() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { eliminarPoema } = usePoemas()
  const { esAdmin } = useAuth()
  const [poema, setPoema] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3000/api/poemas/${id}`)
      .then(res => res.json())
      .then(data => {
        setPoema(data)
        setCargando(false)
      })
  }, [id])

  const handleEliminar = () => {
    if (confirm('¿Estás seguro de eliminar este poema?')) {
      eliminarPoema(id)
      navigate('/biblioteca')
    }
  }

  const handleCopiar = () => {
    navigator.clipboard.writeText(poema.contenido)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  if (cargando) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-teal-400 text-xl">Cargando poema...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 p-10">
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <span className="text-xs bg-teal-400 text-gray-950 px-3 py-1 rounded-full font-bold">
          {poema.categoria}
        </span>

        <h1 className="text-4xl font-bold text-white mt-4 mb-2">
          {poema.titulo}
        </h1>

        <p className="text-teal-400 mb-6">
          ✍️ {poema.autor}
        </p>

        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
            {poema.contenido}
          </p>
        </div>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Link
            to="/biblioteca"
            className="border border-gray-600 text-gray-400 px-4 py-2 rounded-full text-sm hover:border-teal-400 hover:text-teal-400"
          >
            ← Volver
          </Link>

          <button
            onClick={handleCopiar}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              copiado
                ? 'bg-green-500 text-white'
                : 'border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-950'
            }`}
          >
            {copiado ? '✅ Copiado!' : '📋 Copiar poema'}
          </button>

          {esAdmin && (
            <>
              <Link
                to={`/editar/${poema.id}`}
                className="border border-teal-400 text-teal-400 px-4 py-2 rounded-full text-sm hover:bg-teal-400 hover:text-gray-950"
              >
                Editar
              </Link>
              <button
                onClick={handleEliminar}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
              >
                Eliminar
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default DetallePoema