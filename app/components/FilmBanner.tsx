import type { Film } from "~/api/films";

type FilmBannerProps = {
  film: Film;
};

export default function FilmBanner({ film }: FilmBannerProps) {
  return (
    <div>
      <div className="relative h-96 w-full overflow-hidden">
        <div className="container absolute flex h-full w-full flex-col items-start justify-end">
          <div className="bg-slate-700/60 p-5">
            <h1 className="text-center text-5xl font-bold text-slate-100">
              {film.title}
            </h1>
          </div>
        </div>

        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
            alt="Film Banner Image"
            className="-mt-[100px] h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
