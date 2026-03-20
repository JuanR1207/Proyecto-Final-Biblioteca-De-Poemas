import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ children, soloAdmin }) {
  const { usuarioActivo, esAdmin } = useAuth()

  if (!usuarioActivo) {
    return <Navigate to="/login" />
  }

  if (soloAdmin && !esAdmin) {
    return <Navigate to="/" />
  }

  return children
}

export default RutaProtegida