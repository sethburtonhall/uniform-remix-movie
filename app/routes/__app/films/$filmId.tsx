import { LoaderFunction, useLoaderData, useParams } from 'remix';
import { getFilmById } from '~/api/films';
import type { Film } from '~/api/films';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, 'Film id is required');
  const film = await getFilmById(params.filmId);
  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();
  return <div className="container mx-auto">{film.title}</div>;
}
