import { useState } from "react"
import Logo from "~/ui/components/Logo"
import LogoWhite from "~/ui/components/Logo-White"
import { useRouteLoaderData } from "@remix-run/react"
import type { loader as RootLoader } from "~/root"
import { NavMenu } from "~/ui/components/NavMenu"

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

  // Needed to access root loader since <Header> is called on separate routes
  const data = useRouteLoaderData<typeof RootLoader>("root")

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
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm ${hamburgerColor} focus:outline-none min-[800px]:hidden`}
            aria-controls="navbar-default"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-[1.375rem] w-[1.375rem]"
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
          {data && data.mainMenu ? (
            <div
              className={`${
                isNavOpen ? "block" : "hidden"
              } w-full min-[800px]:block min-[800px]:w-auto`}
              id="navbar-default"
            >
              <NavMenu
                navMenuClasses="flex flex-col font-bold md:border-0 md:p-0 min-[800px]:flex-row min-[800px]:space-x-5 min-[800px]:text-sm lg:space-x-8 lg:text-base rtl:space-x-reverse"
                navItemClasses={`${linkColor}`}
                navItemsCollection={data.mainMenu.navItemsCollection}
                showSubNavMenus
              />
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
