import { LoaderFunction, useLoaderData, Link, useParams } from "remix";
import invariant from "tiny-invariant";
import Moment from "moment";

import { getFilmById } from "~/api/films";
import type { Film } from "~/api/films";

import FilmBanner from "~/components/FilmBanner";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "Film id is required");
  const film = await getFilmById(params.filmId);
  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();
  console.log(film);
  return (
    <div>
      <FilmBanner film={film} />
      <section className="body-font overflow-hidden text-zinc-400">
        <div className="container flex justify-end">
          <Link
            to="/films"
            className="flex items-center p-5 text-xl text-slate-100 hover:underline"
          >
            <svg
              className="mr-2 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Back to All Films
          </Link>
        </div>
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt="ecommerce"
              className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="title-font mb-4 text-sm tracking-widest text-zinc-400">
                {film.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="mr-2 inline-block rounded-full bg-slate-700/60 px-3 py-1 text-xs font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </h2>
              <div>
                <h1 className="title-font mb-1 text-3xl font-medium text-slate-100">
                  {film.title}
                </h1>
                <span className="mt-2">
                  released: {Moment(film.release_date).format("MMM DD, YYYY")}
                </span>
              </div>
              <div className="mb-4 flex">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3 text-zinc-400">4 Reviews</span>
                </span>
                <span className="space-x-2s ml-3 flex border-l-2 border-gray-200 py-2 pl-3">
                  <a className="text-zinc-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-zinc-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-zinc-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>

              <p className="mb-6 font-serif">{film.overview}</p>
              <div className="flex">
                <button className="ml-auto flex rounded border-0 bg-indigo-500 py-2 px-6 text-white hover:bg-indigo-600 focus:outline-none">
                  License this Film
                </button>
                <button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-zinc-400">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
