import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import { FavoritasProvider } from '@/core/favoritas/FavoritasProvider'
import App from './App'
import './index.css'

// Punto de entrada: React toma el <div id="root"> del index.html y pinta ahí toda la app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* M7: todo lo que esté adentro del Provider puede leer las favoritas */}
    <FavoritasProvider>
      <App />
    </FavoritasProvider>
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
