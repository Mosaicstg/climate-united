import { type NavItem, type ChildNavItem } from "~/models/nav-menu.server"

export function getURLFromNavItem(navItem: NavItem | ChildNavItem): string {
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
