import { LoaderFunction, useLoaderData, useParams } from 'remix';
import invariant from 'tiny-invariant';

import { getFilmById } from '~/api/films';
import type { Film } from '~/api/films';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, 'Film id is required');
  const film = await getFilmById(params.filmId);
  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-slate-100">{film.title}</h1>
    </div>
  );
}
