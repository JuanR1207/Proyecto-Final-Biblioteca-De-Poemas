import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePoemas } from '../context/PoemasContext'
import { useAuth } from '../context/AuthContext'

function Biblioteca() {
  const { poemas, cargando } = usePoemas()
  const { esAdmin } = useAuth()
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  const categorias = ['Amor', 'Naturaleza', 'Tristeza', 'Alegría', 'Reflexión']

  const poemasFiltrados = poemas.filter(poema => {
    const coincideBusqueda = poema.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      poema.autor.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaSeleccionada === '' || poema.categoria === categoriaSeleccionada
    return coincideBusqueda && coincideCategoria
  })

  if (cargando) return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600')`,
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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="p-10">
        <h1 className="text-4xl font-bold text-orange-300 mb-8">
          Todos los Poemas
        </h1>

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
            <p className="text-gray-300 text-xl">No se encontraron poemas 😔</p>
            {esAdmin && (
              <Link to="/nuevo" className="text-orange-300 hover:underline mt-4 block">
                ¿Quieres crear uno nuevo?
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {poemasFiltrados.map(poema => (
              <div key={poema.id} className="bg-black bg-opacity-50 border border-orange-200 border-opacity-30 rounded-2xl p-6 backdrop-blur-sm hover:border-orange-300 transition-all">
                <span className="text-xs bg-orange-300 text-black px-3 py-1 rounded-full font-bold">
                  {poema.categoria}
                </span>
                <h2 className="text-xl font-bold text-white mt-3 mb-1">
                  {poema.titulo}
                </h2>
                <p className="text-orange-300 text-sm mb-4">
                  ✍️ {poema.autor}
                </p>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {poema.contenido}
                </p>
                <div className="flex gap-3">
                  <Link
                    to={`/poema/${poema.id}`}
                    className="bg-orange-300 text-black px-4 py-1 rounded-full text-sm font-bold hover:bg-orange-400 transition-all"
                  >
                    Ver más
                  </Link>
                  {esAdmin && (
                    <Link
                      to={`/editar/${poema.id}`}
                      className="border border-orange-300 text-orange-300 px-4 py-1 rounded-full text-sm font-bold hover:bg-orange-300 hover:text-black transition-all"
                    >
                      Editar
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Biblioteca