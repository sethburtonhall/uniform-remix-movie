import { Link } from 'remix';

export default function Header() {
  return (
    <header className="text-slate-50 body-font">
      <div className="container mx-auto flex p-5 flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-slate-50 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-slate-50 p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-4xl">Cinematic</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/films"
            className="group flex items-center text-lg font-serif mr-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5 text-slate-50 mr-3 group-hover:text-indigo-500 "
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="group-hover:text-indigo-500">Film Library</span>
          </Link>

          <a className="text-lg font-serif mr-5">
            <button className="button--cta">Login</button>
          </a>
        </nav>
      </div>
    </header>
  );
}