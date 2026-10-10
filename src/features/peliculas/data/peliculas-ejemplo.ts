// Datos de ejemplo para trabajar sin la API. Sin póster a propósito:

import type { Pelicula } from "../models/pelicula"

// así se ve el ícono de reemplazo. Las notas son aproximadas.
function ejemplo(id: number, title: string, release_date: string, vote_average: number): Pelicula {
return {
        id,
        title,
        original_title: title,
        overview: '',
        poster_path: null,
        backdrop_path: null,
        release_date,
        vote_average,
        vote_count: 1000,
        genre_ids: [],
    }
}

export const PELICULAS_EJEMPLO: Pelicula[] = [
ejemplo(1, 'El Padrino', '1972-03-14', 8.7),
ejemplo(2, 'Matrix', '1999-03-30', 4.2),
ejemplo(3, 'El viaje de Chihiro', '2001-07-20', 8.5),
ejemplo(4, 'Coco', '2017-10-27', 5.2),
ejemplo(5, 'Parásitos', '2019-05-30', 8.5),
ejemplo(6, 'Interestelar', '2014-11-05', 8.4),
ejemplo(7, 'Una película sin votos', '', 0),
ejemplo(8, 'La peor película del año', '2020-01-01', 3.9),
]