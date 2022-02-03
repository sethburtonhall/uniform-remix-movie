export type Film = {
  id: number;
  title: string;
  poster_path: string;
};

export async function getFilms(title?: string | null) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  const films = await response.json();

  console.log('FILMS', films);

  return films.results.filter((film: Film) => {
    if (title) {
      return film.title.toLowerCase().includes(title.toLowerCase());
    }
    return films;
  });
}

export async function getFilmById(id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  const film: Film = await response.json();

  return film;
}
