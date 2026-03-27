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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-orange-300 text-xl">Cargando poema...</p>
    </div>
  )

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="p-10">
        <div className="max-w-2xl mx-auto bg-black bg-opacity-50 border border-orange-200 border-opacity-30 rounded-2xl p-8 backdrop-blur-sm">

          <span className="text-xs bg-orange-300 text-black px-3 py-1 rounded-full font-bold">
            {poema.categoria}
          </span>

          <h1 className="text-4xl font-bold text-white mt-4 mb-2">
            {poema.titulo}
          </h1>

          <p className="text-orange-300 mb-6">
            ✍️ {poema.autor}
          </p>

          <div className="bg-black bg-opacity-30 rounded-xl p-6 mb-6 border border-orange-100 border-opacity-20">
            <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
              {poema.contenido}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              to="/biblioteca"
              className="border border-gray-400 text-gray-300 px-4 py-2 rounded-full text-sm hover:border-orange-300 hover:text-orange-300 transition-all"
            >
              ← Volver
            </Link>

            <button
              onClick={handleCopiar}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                copiado
                  ? 'bg-green-400 text-black'
                  : 'border border-orange-300 text-orange-300 hover:bg-orange-300 hover:text-black'
              }`}
            >
              {copiado ? '✅ Copiado!' : '📋 Copiar poema'}
            </button>

            {esAdmin && (
              <>
                <Link
                  to={`/editar/${poema.id}`}
                  className="border border-orange-300 text-orange-300 px-4 py-2 rounded-full text-sm hover:bg-orange-300 hover:text-black transition-all"
                >
                  Editar
                </Link>
                <button
                  onClick={handleEliminar}
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-all"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default DetallePoema