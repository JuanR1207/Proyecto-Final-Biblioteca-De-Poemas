import { createContext, useContext, useState, useEffect } from "react";

export const PoemasContext = createContext();

export const PoemasProvider = ({ children }) => {

  const [poemas, setPoemas] = useState([])
  const [cargando, setCargando] = useState(true)

  const obtenerPoemas = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/poemas')
      const data = await res.json()
      setPoemas(data)
    } catch (error) {
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  const crearPoema = async (poema) => {
    try {
      const res = await fetch('http://localhost:3000/api/poemas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poema)
      })
      const data = await res.json()
      console.log(data)
      obtenerPoemas()
    } catch (error) {
      console.error(error)
    }
  }

  const eliminarPoema = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/poemas/${id}`, {
        method: 'DELETE'
      })
      setPoemas(prev => prev.filter(p => p.id !== parseInt(id)))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    obtenerPoemas()
  }, [])

  return (
    <PoemasContext.Provider value={{ poemas, cargando, crearPoema, eliminarPoema }}>
      {children}
    </PoemasContext.Provider>
  )
}

export const usePoemas = () => useContext(PoemasContext)