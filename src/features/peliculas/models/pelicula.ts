export interface Pelicula {
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
}

export type PeliculaResumen = Pick<Pelicula, 'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average'>

export function anio(fecha: string) {
    return fecha ? fecha.slice(0,4) : 's/f'
}