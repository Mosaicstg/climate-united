import {
  type ChildNavItem,
  type NavItem,
  type NavMenu,
} from "~/models/nav-menu.server"
import { NavItemLink } from "./NavItem"
import { useId, useState } from "react"
import { cn } from "~/lib/utils"

type NavMenuProps = NavMenu & {
  navMenuClasses: string
  navItemClasses: string
  showSubNavMenus?: boolean
}

function getURLFromNavItem(navItem: NavItem | ChildNavItem): string {
  let url
  let slug = navItem.linkedItem.slug
  let { externalLink } = navItem

  switch (navItem.linkedItem.__typename) {
    case "Post":
      url = `/news/${slug}`
      break
    case "Event":
      url = `/events/${slug}`
      break
    case "CaseStudy":
      url = `/case-study/${slug}`
      break
    case "TeamMember":
      url = `/team/${slug}`
      break
    default:
      url = `/${slug}`
      break
  }

  if (externalLink) {
    url = externalLink
  }

  return url
}

export function NavMenu({
  navMenuClasses,
  navItemClasses,
  navItemsCollection,
  showSubNavMenus = false,
}: NavMenuProps) {
  const buttonId = useId()
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  function onDropdownButtonClick(e: any) {
    setDropdownIsOpen((dropdownIsOpen) => !dropdownIsOpen)
  }

  return (
    <ul className={navMenuClasses}>
      {navItemsCollection.items.map((navItem, index) => {
        let url = getURLFromNavItem(navItem)
        let { externalLink } = navItem
        let shouldRenderSubNavItems =
          navItem.childNavItemsCollection.items &&
          Array.isArray(navItem.childNavItemsCollection.items) &&
          navItem.childNavItemsCollection.items.length > 0 &&
          showSubNavMenus

        return (
          <li key={index} className="relative">
            {shouldRenderSubNavItems ? (
              <button
                className={cn(
                  navItemClasses,
                  "flex w-full items-center justify-between after:text-lg after:content-['+'] md:block md:after:content-[none]",
                )}
                id={buttonId}
                onClick={onDropdownButtonClick}
              >
                {navItem.name}
              </button>
            ) : (
              <NavItemLink
                className={navItemClasses}
                href={`${url}`}
                rel={
                  url === externalLink
                    ? "external nofollow noreferrer"
                    : undefined
                }
              >
                {navItem.name}
              </NavItemLink>
            )}
            {shouldRenderSubNavItems ? (
              <ul
                className={cn(
                  `relative top-[115%] z-10 mt-2 hidden min-w-[200px] gap-2 border-b-2 border-b-green bg-white p-4 md:absolute`,
                  dropdownIsOpen ? "flex flex-col" : "",
                )}
                aria-describedby={buttonId}
              >
                {navItem.childNavItemsCollection.items.map(
                  (subNavItem, index) => {
                    let url = getURLFromNavItem(subNavItem)
                    let { externalLink } = subNavItem

                    return (
                      <li key={index}>
                        <NavItemLink
                          className=""
                          href={url}
                          rel={
                            url === externalLink
                              ? "external nofollow noreferrer"
                              : undefined
                          }
                        >
                          {subNavItem.name}
                        </NavItemLink>
                      </li>
                    )
                  },
                )}
              </ul>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
