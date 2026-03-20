import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RutaProtegida from './components/RutaProtegida'
import Home from './pages/Home'
import Biblioteca from './pages/Biblioteca'
import FormularioPoema from './pages/FormularioPoema'
import DetallePoema from './pages/DetallePoema'
import Login from './pages/Login'
import VistaUsuario from './pages/VistaUsuario'
import { useAuth } from './context/AuthContext'

function App() {
  const { usuarioActivo, esAdmin } = useAuth()

  return (
    <BrowserRouter>
      {usuarioActivo && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RutaProtegida>
            {esAdmin ? <Home /> : <VistaUsuario />}
          </RutaProtegida>
        } />
        <Route path="/biblioteca" element={
          <RutaProtegida soloAdmin>
            <Biblioteca />
          </RutaProtegida>
        } />
        <Route path="/poema/:id" element={
          <RutaProtegida soloAdmin>
            <DetallePoema />
          </RutaProtegida>
        } />
        <Route path="/nuevo" element={
          <RutaProtegida soloAdmin>
            <FormularioPoema />
          </RutaProtegida>
        } />
        <Route path="/editar/:id" element={
          <RutaProtegida soloAdmin>
            <FormularioPoema />
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App