import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // ✅ Inicializa desde localStorage para que la sesión sobreviva recargas
  const [usuarioActivo, setUsuarioActivo] = useState(
    () => localStorage.getItem('usuario') || null
  )
  const [esAdmin, setEsAdmin] = useState(
    () => localStorage.getItem('rol') === 'admin'
  )
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  )

  const registro = async (usuario, contraseña) => {
    try {
      const res = await fetch('https://proyecto-final-biblioteca-de-poemas.onrender.com/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña })
      })
      const data = await res.json()
      if (!res.ok) return { exito: false, mensaje: data.mensaje }
      return { exito: true, mensaje: data.mensaje }
    } catch (error) {
      return { exito: false, mensaje: 'Error de conexión con el servidor' }
    }
  }

  const login = async (usuario, contraseña) => {
    try {
      const res = await fetch('https://proyecto-final-biblioteca-de-poemas.onrender.com/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña })
      })
      if (!res.ok) return false

      const data = await res.json()

      // ✅ Persiste todo en localStorage incluyendo el id
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', data.usuario)
      localStorage.setItem('rol', data.rol)
      localStorage.setItem('usuario_id', data.id)

      setUsuarioActivo(data.usuario)
      setEsAdmin(data.rol === 'admin')
      setToken(data.token)

      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    // ✅ Limpia todo al cerrar sesión
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('rol')
    localStorage.removeItem('usuario_id')
    setUsuarioActivo(null)
    setEsAdmin(false)
    setToken(null)
  }

  return (
    // ✅ Expone token para que otros componentes lo puedan usar
    <AuthContext.Provider value={{ usuarioActivo, esAdmin, token, registro, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)