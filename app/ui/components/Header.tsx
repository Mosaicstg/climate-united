import { useState, useId, useRef, useEffect } from "react"
import { useRouteLoaderData } from "@remix-run/react"
import {
  HeaderNavMenu,
  HeaderNavMenuItem,
  HeaderNavMenuSubMenu,
  HeaderNavMenuSubMenuLink,
  HeaderNavMenuSubMenuNavItem,
  HeaderNavMenuSubMenuToggleButton,
} from "./HeaderNavMenu"
import Logo from "~/ui/components/Logo"
import LogoWhite from "~/ui/components/Logo-White"
import { NavItemLink } from "./NavItem"
import { cn } from "~/lib/utils"
import { getURLFromNavItem } from "~/utils/get-relative-url-from-nav-item"
import { type ComponentPropsWithoutRef } from "react"
import { type NavItem } from "~/models/nav-menu.server"
import { type loader as RootLoader } from "~/root"

type HeaderProps = ComponentPropsWithoutRef<"header"> & {
  useGreenHeaderStyle?: boolean
  useTransparentHeaderStyle?: boolean
}

export default function Header({
  className,
  useGreenHeaderStyle = false,
  useTransparentHeaderStyle = false,
  ...restOfProps
}: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Needed to access root loader since <Header> is called on separate routes
  const data = useRouteLoaderData<typeof RootLoader>("root")

  return (
    <header
      className={cn(
        "relative top-0 z-50 w-full bg-white",
        useGreenHeaderStyle ? `bg-lightGreen` : "",
        useTransparentHeaderStyle
          ? `bg-lightGreen md:absolute md:left-0 md:bg-transparent`
          : "",
        className,
      )}
      {...restOfProps}
    >
      <nav>
        <div className="mx-auto flex max-w-screen-lg flex-wrap items-center justify-between gap-x-12 gap-y-5 p-5 xl:max-w-screen-xl">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-[180px]">
              {useGreenHeaderStyle ? (
                <LogoWhite />
              ) : useTransparentHeaderStyle ? (
                <LogoWhite />
              ) : (
                <Logo />
              )}
            </div>
            <span className="sr-only">Climate United</span>
          </a>
          <button
            data-collapse-toggle="navbar-main"
            type="button"
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-lg text-sm text-darkBlue hover:text-blue focus:text-blue focus:outline-none min-[800px]:hidden",
              useGreenHeaderStyle ? "text-white" : "",
              useTransparentHeaderStyle ? "text-white" : "",
            )}
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
              className={cn(
                "w-full min-[800px]:block min-[800px]:w-auto",
                isNavOpen ? "block" : "hidden",
              )}
              id="navbar-default"
            >
              <HeaderNavMenu
                className={cn(
                  "relative",
                  "[&>*:last-child>ul]:last:left-[unset] [&>*:last-child>ul]:last:right-0 [&>*>ul]:last:left-0",
                )}
              >
                {data.mainMenu.navItemsCollection.items.map((navItem) => {
                  const { name, childNavItemsCollection, externalLink } =
                    navItem

                  const hasSubMenu = childNavItemsCollection.items.length > 0

                  const url = getURLFromNavItem(navItem)

                  return (
                    <HeaderNavMenuItem key={name} className="relative">
                      {hasSubMenu ? (
                        <NavItemWithDropDown
                          navItem={navItem}
                          useAlternativeStyle={
                            useGreenHeaderStyle || useTransparentHeaderStyle
                          }
                        />
                      ) : (
                        <NavItemLink
                          href={url}
                          target={url === externalLink ? "_blank" : undefined}
                          rel={
                            url === externalLink
                              ? "external nofollow noreferrer"
                              : undefined
                          }
                          className={cn(
                            useGreenHeaderStyle ? "text-white" : "",
                            useTransparentHeaderStyle ? "text-white" : "",
                          )}
                        >
                          {name}
                        </NavItemLink>
                      )}
                    </HeaderNavMenuItem>
                  )
                })}
              </HeaderNavMenu>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}

function NavItemWithDropDown({
  navItem,
  useAlternativeStyle = false,
}: {
  navItem: NavItem
  useAlternativeStyle?: boolean
}) {
  const buttonId = useId()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  // TODO: use this ref to help "animate" the open/closing of dropdown on mobile
  const subMenuRef = useRef<HTMLUListElement>(null)
  const subMenuId = `sub-menu-${buttonId}`
  const buttonRef = useRef<HTMLButtonElement>(null)

  function onClick(_: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setSubMenuOpen((subMenuOpen) => !subMenuOpen)
  }

  // NOTE: This is the quick-and-dirty version of a solution for this
  //       This is also not a React-y pattern for handling this scenario
  useEffect(() => {
    if (!buttonRef.current) {
      return
    }

    if (!subMenuRef.current) {
      return
    }

    function handleClickOutside(event: Event) {
      if (!event.target) {
        return
      }

      if (!(event.target instanceof Element)) {
        return
      }

      if (
        buttonRef.current !== event.target &&
        !subMenuRef.current?.contains(event.target)
      ) {
        setSubMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [buttonRef, subMenuRef, setSubMenuOpen])

  return (
    <>
      <HeaderNavMenuSubMenuToggleButton
        type="button"
        ref={buttonRef}
        className={cn(
          useAlternativeStyle ? "text-white" : "",
          subMenuOpen ? "after:rotate-45" : "",
        )}
        id={buttonId}
        onClick={onClick}
        aria-controls={subMenuId}
        aria-expanded={subMenuOpen}
      >
        {navItem.name}
      </HeaderNavMenuSubMenuToggleButton>
      <HeaderNavMenuSubMenu
        ref={subMenuRef}
        className={cn(
          useAlternativeStyle
            ? "border-b-white bg-lightGreen text-white md:border-b-lightGreen md:bg-white md:text-black"
            : "",
          subMenuOpen ? "flex flex-col" : "",
        )}
        aria-labelledby={buttonId}
        id={subMenuId}
        role="menu"
      >
        {navItem.childNavItemsCollection.items.map((subNavItem, index) => {
          let url = getURLFromNavItem(subNavItem)
          let { externalLink } = subNavItem

          return (
            <HeaderNavMenuSubMenuNavItem key={index}>
              <HeaderNavMenuSubMenuLink
                href={url}
                target={url === externalLink ? "_blank" : undefined}
                rel={
                  url === externalLink
                    ? "external nofollow noreferrer"
                    : undefined
                }
              >
                {subNavItem.name}
              </HeaderNavMenuSubMenuLink>
            </HeaderNavMenuSubMenuNavItem>
          )
        })}
      </HeaderNavMenuSubMenu>
    </>
  )
}
