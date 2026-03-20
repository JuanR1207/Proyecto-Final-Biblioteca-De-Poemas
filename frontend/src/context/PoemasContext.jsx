import { createContext, useState, useEffect, useContext } from 'react'

const PoemasContext = createContext()

export function PoemasProvider({ children }) {
  const [poemas, setPoemas] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargarPoemas = () => {
    fetch('http://localhost:3000/api/poemas')
      .then(res => res.json())
      .then(data => {
        setPoemas(data)
        setCargando(false)
      })
  }

  useEffect(() => {
    cargarPoemas()
  }, [])

  const eliminarPoema = (id) => {
    fetch(`http://localhost:3000/api/poemas/${id}`, {
      method: 'DELETE'
    }).then(() => cargarPoemas())
  }

  return (
    <PoemasContext.Provider value={{ poemas, cargando, cargarPoemas, eliminarPoema }}>
      {children}
    </PoemasContext.Provider>
  )
}

export function usePoemas() {
  return useContext(PoemasContext)
}