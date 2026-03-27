import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function VistaUsuario() {
  const { usuarioActivo } = useAuth()
  const [poemas, setPoemas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [copiado, setCopiado] = useState(null)

  const categorias = ['Amor', 'Naturaleza', 'Tristeza', 'Alegría', 'Reflexión']

  useEffect(() => {
    fetch('https://proyecto-final-biblioteca-de-poemas.onrender.com/api/poemas')
      .then(res => res.json())
      .then(data => {
        setPoemas(data)
        setCargando(false)
      })
      .catch(err => {
        console.error(err)
        setCargando(false)
      })
  }, [])

  const poemasFiltrados = poemas.filter(poema => {
    const coincideBusqueda =
      poema.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      poema.autor.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria =
      categoriaSeleccionada === '' || poema.categoria === categoriaSeleccionada
    return coincideBusqueda && coincideCategoria
  })

  const handleCopiar = (poema) => {
    navigator.clipboard.writeText(poema.contenido)
    setCopiado(poema.id)
    setTimeout(() => setCopiado(null), 2000)
  }

  if (cargando) return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-orange-300 text-xl">Cargando poemas...</p>
    </div>
  )

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="p-10">

        <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-orange-300">
            Bienvenido, {usuarioActivo} 👤
          </h1>
          <Link
            to="/mi-poema/nuevo"
            className="bg-orange-300 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition-all"
          >
            + Nuevo Poema
          </Link>
        </div>

        <p className="text-gray-300 mb-8">
          Explora todos los poemas de la biblioteca
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 placeholder-gray-400 backdrop-blur-sm"
          />
          <select
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
            className="bg-black bg-opacity-40 text-white border border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 backdrop-blur-sm"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {poemasFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-300 text-xl mb-4">
              No hay poemas todavía 😔
            </p>
            <Link
              to="/mi-poema/nuevo"
              className="bg-orange-300 text-black px-6 py-3 rounded-full font-bold hover:bg-orange-400 transition-all"
            >
              ✍️ Escribe el primero
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {poemasFiltrados.map(poema => (
              <div
                key={poema.id}
                className="bg-black bg-opacity-50 border border-orange-200 border-opacity-30 rounded-2xl p-6 backdrop-blur-sm hover:border-orange-300 transition-all"
              >
                <span className="text-xs bg-orange-300 text-black px-3 py-1 rounded-full font-bold">
                  {poema.categoria}
                </span>
                <h2 className="text-xl font-bold text-white mt-3 mb-1">
                  {poema.titulo}
                </h2>
                <p className="text-orange-300 text-sm mb-4">
                  ✍️ {poema.autor}
                </p>
                <div className="bg-black bg-opacity-30 rounded-xl p-4 mb-4 border border-orange-100 border-opacity-20">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                    {poema.contenido}
                  </p>
                </div>
                <button
                  onClick={() => handleCopiar(poema)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    copiado === poema.id
                      ? 'bg-green-400 text-black'
                      : 'border border-orange-300 text-orange-300 hover:bg-orange-300 hover:text-black'
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

export default VistaUsuario