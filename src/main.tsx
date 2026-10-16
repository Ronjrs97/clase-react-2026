import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import App from './App'
import './index.css'

// Punto de entrada: React toma el <div id="root"> del index.html y pinta ahí toda la app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
