import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"

export const LinkedItemSchema = z.object({
  __typename: z.string(),
  slug: z.string(),
})

export const ChildNavItemSchema = z.object({
  name: z.string(),
  linkedItem: LinkedItemSchema,
  externalLink: z.string().nullable().optional(),
})

export const NavItemSchema = ChildNavItemSchema.merge(
  z.object({
    childNavItemsCollection: z.object({
      items: z.array(ChildNavItemSchema),
    }),
  }),
)

export const NavMenuSchema = z.object({
  navItemsCollection: z.object({
    items: z.array(NavItemSchema),
  }),
})

export type NavMenu = z.infer<typeof NavMenuSchema>
export type NavItem = z.infer<typeof NavItemSchema>
export type ChildNavItem = z.infer<typeof ChildNavItemSchema>

export async function getNavMenus(menuLocation: string) {
  const query = `query {
  navMenuCollection( limit: 1, where: {menuLocation: "${menuLocation}"} ) {
    items {
      name
      menuLocation
      navItemsCollection {
        items {
          name
          linkedItem {
            __typename
            ... on AboutPage {
              slug
            }
            ... on CaseStudy {
              slug
            }
            ... on CaseStudies {
              slug
            }
            ... on Event {
              slug
            }
            ... on LandingPage {
              slug
            }
            ... on Page {
              slug
            }
            ... on Post {
              slug
            }
            ... on TeamPage {
              slug
            }
          }
          externalLink
          childNavItemsCollection(limit: 50) {
            items {
              name
              linkedItem {
                __typename
                ... on AboutPage {
                  slug
                }
                ... on CaseStudy {
                  slug
                }
                ... on CaseStudies {
                  slug
                }
                ... on Event {
                  slug
                }
                ... on LandingPage {
                  slug
                }
                ... on Page {
                  slug
                }
                ... on Post {
                  slug
                }
                ... on TeamPage {
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
}`

  const response = await typedFetchGraphQL<{
    navMenuCollection: { items: Array<NavMenu> }
  }>(query)

  if (!response.data) {
    console.error(`Error getting Nav Menu`, response.errors)

    return null
  }

  const navMenu = response.data.navMenuCollection.items[0]

  return validateWithSchema(NavMenuSchema, navMenu)
}
