import { Link } from "remix";

export default function Header() {
  return (
    <header className="body-font mb-4 text-slate-50">
      <div className="container mx-auto flex flex-row items-center p-5">
        <Link
          to="/"
          className="title-font mb-4 flex items-center font-medium text-slate-50 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-slate-50"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-4xl">Cinematic</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          <Link
            to="/?utm_campaign=comedy"
            className="group mr-5 flex items-center font-serif text-lg"
          >
            <svg
              className="mr-3 h-5 w-5 text-slate-50 group-hover:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="group-hover:text-indigo-500">Comedy</span>
          </Link>

          <Link
            to="/?utm_campaign=action"
            className="group mr-5 flex items-center font-serif text-lg"
          >
            <svg
              className="mr-3 h-5 w-5 text-slate-50 group-hover:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            <span className="group-hover:text-indigo-500">Action</span>
          </Link>

          <Link
            to="/films"
            className="group mr-5 flex items-center font-serif text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mr-3 h-5 w-5 text-slate-50 group-hover:text-indigo-500 "
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="group-hover:text-indigo-500">Film Library</span>
          </Link>

          <a className="mr-5 font-serif text-lg">
            <button className="button--cta">Login</button>
          </a>
        </nav>
      </div>
    </header>
  );
}
