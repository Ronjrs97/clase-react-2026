import { Clapperboard, Heart, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PeliculaCard from './features/peliculas/components/PeliculaCard'
import { PELICULAS_EJEMPLO } from './features/peliculas/data/peliculas-ejemplo'

function App() {
 return (
  <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Clapperboard className="size-5" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight">Peliculas</h1>
      </div>
 
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <PeliculaCard pelicula={PELICULAS_EJEMPLO[0]}/>
        <PeliculaCard pelicula={PELICULAS_EJEMPLO[1]}/>
        <PeliculaCard pelicula={PELICULAS_EJEMPLO[2]}/>
        <PeliculaCard pelicula={PELICULAS_EJEMPLO[3]}/>
      </div>
      
    </main>
 )
}

export default App
