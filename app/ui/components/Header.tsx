import Logo from "~/ui/components/Logo"

export default function Header() {
  return (
    <header>
      <nav>
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-12 border-b-4 border-dotted border-green p-5">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
            <span className="sr-only">Climate United</span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col font-semibold rtl:space-x-reverse md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
              <li>
                <a href="/about-climate-united" aria-current="page">
                  About
                </a>
              </li>
              <li>
                <a href="/our-team">Meet the Team</a>
              </li>
              <li>
                <a href="/about-the-greenhouse-gas-reduction-fund">
                  About the GGRF
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
