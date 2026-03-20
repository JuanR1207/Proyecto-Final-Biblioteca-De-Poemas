import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

const usuarios = [
  { id: 1, usuario: 'admin', contraseña: 'admin123', rol: 'admin' },
  { id: 2, usuario: 'usuario', contraseña: '123456', rol: 'usuario' },
]

export function AuthProvider({ children }) {
  const [usuarioActivo, setUsuarioActivo] = useState(null)

  const login = (usuario, contraseña) => {
    const encontrado = usuarios.find(
      u => u.usuario === usuario && u.contraseña === contraseña
    )
    if (encontrado) {
      setUsuarioActivo(encontrado)
      return true
    }
    return false
  }

  const logout = () => {
    setUsuarioActivo(null)
  }

  const esAdmin = usuarioActivo?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuarioActivo, login, logout, esAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}