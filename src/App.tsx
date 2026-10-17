import { Header } from '@/core/layout/Header'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { useState } from 'react'
import type { PeliculaResumen } from './features/peliculas/models/pelicula'
import { toast } from 'sonner'

// App es el componente raíz: arma la pantalla y guarda el estado que comparten varias partes.
export default function App() {
  // TODO* M1: guardar las favoritas con useState<PeliculaResumen[]>([])
  const [favoritas, setFavoritas] = useState<PeliculaResumen[]>([])

  const esFavorita = (id: number) => favoritas.some((f) => f.id === id)

  //* TODO M1: escribir alternarFavorita(p): si ya está la quita (filter), si no la agrega ([...favoritas, p])
  function alternarFavorita(p: PeliculaResumen){
    
    if (esFavorita(p.id)) {
      setFavoritas(favoritas.filter((f) => f.id !== p.id))
      toast(`Quitaste "${p.title}" de favoritas`)
    } else {
      setFavoritas([...favoritas, p])
      toast.success(`"${p.title}" agregada a favoritos`)
    }
  }
  // TODO M2: guardar la vista actual con useState<Vista>('catalogo')
  
  return (
    <div className="flex min-h-dvh flex-col">
      {/* TODO M1: totalFavoritas={favoritas.length}   TODO M2: vista y onCambiarVista */}
      <Header vista="catalogo" totalFavoritas={favoritas.length} onCambiarVista={() => {}} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* TODO M2: según la vista, pintar CatalogoPeliculas o MisFavoritas */}
        <CatalogoPeliculas esFavorita={esFavorita} onFavorito={alternarFavorita} />
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
