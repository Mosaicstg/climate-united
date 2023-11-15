import { useState } from "react"
import Logo from "~/ui/components/Logo"
import LogoWhite from "~/ui/components/Logo-White"

export default function Header({
  altLogo = false,
  bgColor = "bg-white",
  borderColor = "md:border-blue",
  linkColor = "text-green hover:text-blue",
  hamburgerColor = "text-darkBlue hover:text-green focus:text-green",
}: {
  altLogo?: boolean
  bgColor?: string
  borderColor?: string
  linkColor?: string
  hamburgerColor?: string
}) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <header className={`${bgColor}`}>
      <nav>
        <div
          className={`mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-x-12 gap-y-5 p-5 md:border-b-4 md:border-dotted ${borderColor}`}
        >
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-[180px]">
              {altLogo ? <LogoWhite /> : <Logo />}
            </div>
            <span className="sr-only">Climate United</span>
          </a>
          <button
            data-collapse-toggle="navbar-main"
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm ${hamburgerColor} focus:outline-none md:hidden`}
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
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
          <div
            className={`${
              isNavOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="flex flex-col font-bold rtl:space-x-reverse md:flex-row md:space-x-8 md:border-0 md:p-0">
              <li>
                <a
                  className={`${linkColor}`}
                  href="/about-climate-united"
                  aria-current="page"
                >
                  About
                </a>
              </li>
              <li>
                <a className={`${linkColor}`} href="/our-team">
                  Meet the Team
                </a>
              </li>
              <li>
                <a
                  className={`${linkColor}`}
                  href="/about-the-greenhouse-gas-reduction-fund"
                >
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
