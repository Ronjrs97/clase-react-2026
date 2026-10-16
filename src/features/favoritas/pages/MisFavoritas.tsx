import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'

interface Props {
  favoritas: PeliculaResumen[]
  onFavorito: (pelicula: PeliculaResumen) => void
  onIrAlCatalogo: () => void
}

// La misma Grilla, ahora con datos que no vienen de la API sino del estado de App.
// Se conecta en M2.
// TODO M2: recibir también onIrAlCatalogo
export function MisFavoritas({ favoritas, onFavorito }: Props) {
  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>

      {/* TODO M2: si no hay favoritas, mostrar <EstadoVacio icono={Heart} ...> con un botón "Ir al catálogo" adentro */}
      {/* En esta lista todas son favoritas, así que esFavorita siempre devuelve true */}
      <GrillaPeliculas peliculas={favoritas} esFavorita={() => true} onFavorito={onFavorito} />
    </section>
  )
}
