import type { Film } from '~/api/films';

type FilmBannerProps = {
  film: Film;
};

export default function FilmBanner({ film }: FilmBannerProps) {
  return (
    <div>
      <div className="w-full h-96 overflow-hidden relative">
        <div className="container w-full h-full flex flex-col absolute justify-end items-start">
          <div className="bg-slate-700/60 p-5">
            <h1 className="text-5xl font-bold text-center text-slate-100">
              {film.title}
            </h1>
          </div>
        </div>

        <div>
          <img
            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
            alt="Film Banner Image"
            className="w-full h-auto -mt-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
