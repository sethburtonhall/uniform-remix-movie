import { useRef } from 'react';
import { Link, Form, useLoaderData, useTransition } from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import Cookies from 'universal-cookie';

import { getFilms } from '~/api/films';
import type { Film } from '~/api/films';

export const meta: MetaFunction = () => ({
  title: 'Films | Cinematic',
  description: 'A film library for cinematic enthusiasts.',
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  const cookies = new Cookies(request.headers.get('cookie'));
  const genreId = cookies.get('genreId');

  if (genreId === 'action') {
    return {
      films: await getFilms(title, 28),
      genreId,
    };
  } else if (genreId === 'comedy') {
    return {
      films: await getFilms(title, 35),
      genreId,
    };
  }
  return {
    films: await getFilms(title, 10402),
    genreId,
  };
};

export default function FilmsIndex() {
  const { films } = useLoaderData();
  const inputRef = useRef<HTMLInputElement>(null);
  const { genreId } = useLoaderData();
  const transition = useTransition();

  return (
    <div className="container mx-auto">
      {/* <h1 className="text-5xl font-bold text-center mb-10 text-slate-100">
        Film Library
      </h1> */}
      <div className="flex justify-between items-center">
        <Form method="get" className="my-10">
          <input
            ref={inputRef}
            type="text"
            name="title"
            placeholder="Search by title..."
            className="rounded-md p-2 mr-4"
          />
          <button type="submit" className="button--cta">
            {transition.submission ? 'Searching...' : 'Search'}
          </button>
        </Form>
        <div>
          <button
            className={`text-xl ${
              genreId === 'action' ? 'text-yellow-500' : 'text-fuchsia-500'
            }`}
          >
            {genreId === 'action'
              ? `# ${genreId.toUpperCase()}`
              : `# ${genreId.toUpperCase()} `}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-8">
        {films.map((film: Film) => (
          <Link key={film.id} to={`/films/${film.id}`} prefetch="intent">
            <img
              key={film.id}
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.title}
              className="hover:shadow-xl hover:scale-105 rounded-md transition ease-in-out delay-75 hover:-translate-y-1  duration-300"
            />
            <h1 className="text-xl text-slate-100 text-center mt-2">
              {film.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
