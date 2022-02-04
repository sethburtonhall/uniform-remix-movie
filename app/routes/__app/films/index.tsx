import { useEffect, useRef } from "react";
import { Link, Form, useLoaderData, useActionData, useTransition } from "remix";
import type { MetaFunction, LoaderFunction, ActionFunction } from "remix";
import Cookies from "universal-cookie";

import { getFilms } from "~/api/films";
import type { Film } from "~/api/films";

export const meta: MetaFunction = () => ({
  title: "Films | Cinematic",
  description: "A film library for cinematic enthusiasts.",
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const cookies = new Cookies(request.headers.get("cookie"));
  const genreId = cookies.get("genreId");

  if (genreId === "action") {
    return {
      films: await getFilms(title, 28),
      genreId,
    };
  } else if (genreId === "comedy") {
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

export let action: ActionFunction = async ({ request }) => {};

export default function FilmsIndex() {
  const { films, genreId } = useLoaderData();
  let actionData = useActionData();
  const transition = useTransition();

  let state: "idle" | "success" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.subscription
    ? "success"
    : actionData?.error
    ? "error"
    : "idle";

  const inputRef = useRef<HTMLInputElement>(null);
  let mounted = useRef<boolean>(false);

  useEffect(() => {
    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "error") {
      inputRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <Form method="get" className="my-10">
          <input
            ref={inputRef}
            type="text"
            name="title"
            placeholder="Search by title..."
            className="mr-4 rounded-md p-2"
          />
          <button type="submit" className="button--cta">
            {transition.submission ? "Searching..." : "Search"}
          </button>
        </Form>
        <div>
          <button
            className={`text-xl ${
              genreId === "action"
                ? "font-Action tracking-wide text-yellow-500"
                : genreId === "comedy"
                ? "font-Comedy text-2xl tracking-wide text-fuchsia-500"
                : ""
            }`}
            onClick={() => {
              getFilms();
              inputRef.current?.focus();
            }}
          >
            {genreId === "action"
              ? `# ${genreId.toUpperCase()}`
              : genreId === "comedy"
              ? `# ${genreId.toUpperCase()}`
              : ""}
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
              className="rounded-md transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105  hover:shadow-xl"
            />
            <h1 className="mt-2 text-center text-xl text-slate-100">
              {film.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
