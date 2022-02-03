export type Film = {
  id: number;
  title: string;
  poster_path: string;
};

const baseUrl = 'https://api.themoviedb.org/3';

export async function getFilms(title?: string | null, genre_id?: number) {
  const response = await fetch(
    `${baseUrl}/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=1${
      genre_id && `&with_genres=${genre_id}`
    }`,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );

  const films = await response.json();

  return films.results.filter((film: Film) => {
    if (title) {
      return film.title.toLowerCase().includes(title.toLowerCase());
    }
    return films;
  });
}

export async function getFilmById(id: string) {
  const response = await fetch(
    `${baseUrl}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  );

  const film: Film = await response.json();

  return film;
}
