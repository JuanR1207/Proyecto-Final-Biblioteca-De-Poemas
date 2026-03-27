import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RutaProtegida from './components/RutaProtegida'
import Home from './pages/Home'
import Biblioteca from './pages/Biblioteca'
import FormularioPoema from './pages/FormularioPoema'
import DetallePoema from './pages/DetallePoema'
import Login from './pages/Login'
import Registro from './pages/Registro'
import VistaUsuario from './pages/VistaUsuario'
import Publica from './pages/Publica'
import { useAuth } from './context/AuthContext'

function App() {
  // ✅ esAdmin viene del contexto real, no hardcodeado como true
  const { usuarioActivo, esAdmin } = useAuth()

  return (
    <BrowserRouter>
      {usuarioActivo && <Navbar />}
      <Routes>
        <Route path="/" element={<Publica />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/dashboard" element={
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

        <Route path="/mi-poema/nuevo" element={
          <RutaProtegida>
            <FormularioPoema />
          </RutaProtegida>
        } />

        <Route path="/mi-poema/editar/:id" element={
          <RutaProtegida>
            <FormularioPoema />
          </RutaProtegida>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App