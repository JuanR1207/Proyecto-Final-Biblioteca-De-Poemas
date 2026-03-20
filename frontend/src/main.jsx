import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PoemasProvider } from './context/PoemasContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PoemasProvider>
        <App />
      </PoemasProvider>
    </AuthProvider>
  </StrictMode>,
)