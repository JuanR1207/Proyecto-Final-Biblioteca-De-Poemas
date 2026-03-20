import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

const usuariosIniciales = [
  { id: 1, usuario: 'admin', contraseña: 'admin123', rol: 'admin' },
  { id: 2, usuario: 'usuario', contraseña: '123456', rol: 'usuario' },
]

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(usuariosIniciales)
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

  const registro = (usuario, contraseña) => {
    const existe = usuarios.find(u => u.usuario === usuario)
    if (existe) return { exito: false, mensaje: 'Ese usuario ya existe' }

    const nuevoUsuario = {
      id: usuarios.length + 1,
      usuario,
      contraseña,
      rol: 'usuario'
    }
    setUsuarios([...usuarios, nuevoUsuario])
    setUsuarioActivo(nuevoUsuario)
    return { exito: true }
  }

  const logout = () => {
    setUsuarioActivo(null)
  }

  const esAdmin = usuarioActivo?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuarioActivo, login, logout, registro, esAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}