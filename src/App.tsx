import { Header, type Vista } from '@/core/layout/Header'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { useState } from 'react'
import type { PeliculaResumen } from './features/peliculas/models/pelicula'
import { toast } from 'sonner'

// App es el componente raíz: arma la pantalla y guarda el estado que comparten varias partes.
export default function App() {
  // M1 · Levantar el estado: el Header (contador) y las tarjetas (corazón) necesitan las favoritas,
  // así que viven en el padre común y bajan por props.
  const [favoritas, setFavoritas] = useState<PeliculaResumen[]>([])
  // M2 · Otra memoria independiente: qué pantalla se está viendo
  const [vista, setVista] = useState<Vista>('catalogo')

  const esFavorita = (id: number) => favoritas.some((f) => f.id === id)

  // Inmutabilidad: nunca push ni splice. Siempre un arreglo NUEVO para que React note el cambio.
  function alternarFavorita(p: PeliculaResumen) {
    if (esFavorita(p.id)) {
      setFavoritas(favoritas.filter((f) => f.id !== p.id))
      toast(`Quitaste “${p.title}” de favoritas`)
    } else {
      setFavoritas([...favoritas, p])
      toast.success(`“${p.title}” agregada a favoritas`)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header vista={vista} totalFavoritas={favoritas.length} onCambiarVista={setVista} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* M2 · Renderizado condicional: según la vista se pinta una página u otra.
            En M8 esto lo reemplaza React Router. */}
        {vista === 'catalogo' ? (
          <CatalogoPeliculas esFavorita={esFavorita} onFavorito={alternarFavorita} />
        ) : (
          <MisFavoritas favoritas={favoritas} onFavorito={alternarFavorita} onIrAlCatalogo={() => setVista('catalogo')} />
        )}
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
