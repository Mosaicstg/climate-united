import { type NavMenu } from "~/models/nav-menu.server"
import { NavItemLink } from "./NavItem"
import { getURLFromNavItem } from "~/utils/get-relative-url-from-nav-item"

type NavMenuProps = NavMenu & {
  navMenuClasses: string
  navItemClasses: string
  showSubNavMenus?: boolean
}

export function NavMenu({
  navMenuClasses,
  navItemClasses,
  navItemsCollection,
}: NavMenuProps) {
  return (
    <ul className={navMenuClasses}>
      {navItemsCollection.items.map((navItem, index) => {
        let url = getURLFromNavItem(navItem)
        let { externalLink } = navItem

        return (
          <li key={index} className="relative">
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
          </li>
        )
      })}
    </ul>
  )
}
