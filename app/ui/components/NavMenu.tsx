import type { loader as RootLoader } from "~/root"
import type { NavMenu } from "~/models/nav-menu.server"
import { useRouteLoaderData } from "@remix-run/react"

type NavMenuProps = NavMenu & {
  navMenuClasses: string
  navItemClasses: string
}

export function NavMenu({
  navMenuClasses,
  navItemClasses,
  navItemsCollection,
}: NavMenuProps) {
  const data = useRouteLoaderData<typeof RootLoader>("root")

  return (
    <ul className={navMenuClasses}>
      {navItemsCollection.items.map((navItem, index) => {
        let url
        let slug = navItem.linkedItem.slug

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

        return (
          <li key={index}>
            <a
              className={navItemClasses}
              href={`${data && data.domainURL}${url}`}
            >
              {navItem.name}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
