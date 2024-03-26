import { z } from "zod"
import { SectionTeamSchema } from "~/schemas/sections/section.team.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "./seo.server"

export const TeamPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  headline: z.string().nullable().optional(),
  featuredImage: ImageSchema.nullable().optional(),
  sectionsCollection: z.object({
    items: z.array(SectionTeamSchema),
  }),
  seo: SEOSchema,
})

export const TeamPagesSchema = z.array(TeamPageSchema)

export type TeamPage = z.infer<typeof TeamPageSchema>

export async function getTeamPage(id: string) {
  const query = `query {
    teamPage(id: "${id}") {
      title
      slug
      headline
      sectionsCollection {
        items {
          title
          headline
          mainContent {
            json
          }
          teamMembersCollection(limit: 54) {
            items {
              slug
              name
              position
              department
              featuredImage {
                fileName
                url
                description
                width
                height
              }
            }
          }
        }
      }
      featuredImage {
        fileName
        url
        description
        width
        height
      }
      seo {
              title
              excerpt
              image {
                fileName
                url
                description
                width
                height
              }
              keywords
            }
    }
  }`

  const response = await typedFetchGraphQL<{ teamPage: TeamPage }>(query)

  if (!response.data) {
    console.error("Failed to fetch team page", response.errors)

    return null
  }

  const teamPage = response.data.teamPage

  return validateWithSchema(TeamPageSchema, teamPage)
}

const TeamPageBySlugQuery = `
  query TeamPageBySlug($slug: String!) {
    teamPageCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        headline
        sectionsCollection {
          items {
            title
            headline
            mainContent {
              json
            }
            teamMembersCollection(limit: 54) {
              items {
                slug
                name
                position
                department
                featuredImage {
                  fileName
                  url
                  description
                  width
                  height
                }
              }
            }
          }
        }
        featuredImage {
          fileName
          url
          description
          width
          height
        }
        seo {
          title
          excerpt
          image {
            fileName
            url
            description
            width
            height
          }
          keywords
        }
      }
    }
  }
`

export async function getTeamPageBySlug(
  slug: string,
): Promise<TeamPage | null> {
  const response = await typedFetchGraphQL<{
    teamPageCollection: { items: Array<TeamPage> }
  }>(TeamPageBySlugQuery, { slug })

  if (!response.data) {
    console.error("Failed to fetch team page", response.errors)

    return null
  }

  const teamPage = response.data.teamPageCollection.items[0]

  return validateWithSchema(TeamPageSchema, teamPage)
}
