import { useState } from 'react'
import { Header, type Vista } from '@/core/layout/Header'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'

// M7: las favoritas se mudaron al FavoritasProvider. App ya no las guarda ni las pasa por props.
export default function App() {
  const [vista, setVista] = useState<Vista>('catalogo')

  return (
    <div className="flex min-h-dvh flex-col">
      <Header vista={vista} onCambiarVista={setVista} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {vista === 'catalogo' ? <CatalogoPeliculas /> : <MisFavoritas onIrAlCatalogo={() => setVista('catalogo')} />}
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Datos e imágenes de{' '}
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline hover:text-foreground">
          TMDB
        </a>
        . Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
      </footer>
    </div>
  )
}
