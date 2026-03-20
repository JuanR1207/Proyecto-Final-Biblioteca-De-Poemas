import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Publica() {
  const [poemas, setPoemas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [copiado, setCopiado] = useState(null)

  const categorias = ['Amor', 'Naturaleza', 'Tristeza', 'Alegría', 'Reflexión']

  useEffect(() => {
    fetch('http://localhost:3000/api/poemas')
      .then(res => res.json())
      .then(data => {
        setPoemas(data)
        setCargando(false)
      })
  }, [])

  const poemasFiltrados = poemas.filter(poema => {
    const coincideBusqueda = poema.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      poema.autor.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaSeleccionada === '' || poema.categoria === categoriaSeleccionada
    return coincideBusqueda && coincideCategoria
  })

  const handleCopiar = (poema) => {
    navigator.clipboard.writeText(poema.contenido)
    setCopiado(poema.id)
    setTimeout(() => setCopiado(null), 2000)
  }

  if (cargando) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-teal-400 text-xl">Cargando poemas...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Header público */}
      <div className="bg-gray-900 border-b border-teal-400 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-400">
          📚 Biblioteca de Poemas
        </h1>
        <Link
          to="/login"
          className="bg-teal-400 text-gray-950 px-4 py-2 rounded-full font-bold hover:bg-teal-300 text-sm"
        >
          Iniciar Sesión
        </Link>
      </div>

      <div className="p-10">
        <h2 className="text-4xl font-bold text-teal-400 mb-2">
          Todos los Poemas
        </h2>
        <p className="text-gray-400 mb-8">
          Explora nuestra colección de poemas. Inicia sesión para crear los tuyos.
        </p>

        {/* Búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
          />
          <select
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Poemas */}
        {poemasFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No se encontraron poemas 😔</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {poemasFiltrados.map(poema => (
              <div key={poema.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <span className="text-xs bg-teal-400 text-gray-950 px-3 py-1 rounded-full font-bold">
                  {poema.categoria}
                </span>
                <h2 className="text-xl font-bold text-white mt-3 mb-1">
                  {poema.titulo}
                </h2>
                <p className="text-teal-400 text-sm mb-4">
                  ✍️ {poema.autor}
                </p>
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {poema.contenido}
                  </p>
                </div>
                <button
                  onClick={() => handleCopiar(poema)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    copiado === poema.id
                      ? 'bg-green-500 text-white'
                      : 'border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-950'
                  }`}
                >
                  {copiado === poema.id ? '✅ Copiado!' : '📋 Copiar poema'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Publica