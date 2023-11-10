import { z } from "zod"
import { SectionTeamSchema } from "~/schemas/sections/section.team.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema"
/**
 * query {
 *   teamPage(id: "r4OYblQ1BKEvh8k7RHp09") {
 *     title
 *     headline
 *     sectionsCollection {
 *       items {
 *         title
 *         headline
 *         mainContent {
 *           json
 *         }
 *         teamMembersCollection(limit: 54) {
 *           items {
 *             name
 *             position
 *             department
 *             featuredImage {
 *               fileName
 *               url
 *               description
 *               width
 *               height
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

export const TeamPageSchema = z.object({
  title: z.string(),
  headline: z.string(),
  sectionsCollection: z.object({
    items: z.array(SectionTeamSchema),
  }),
})

export const TeamPagesSchema = z.array(TeamPageSchema)

export type TeamPage = z.infer<typeof TeamPageSchema>

export async function getTeamPage(id: string): Promise<TeamPage | null> {
  const query = `query {
    teamPage(id: "${id}") {
      title
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
    }
  }`

  const response = await typedFetchGraphQL<{ teamPage: TeamPage }>(query)

  if (!response.data) {
    console.error("Failed to fetch team page", response.errors)

    return null
  }

  const teamPage = response.data.teamPage

  return validateWithSchema(TeamPageSchema.nullable(), teamPage)
}

// This function will crash the GraphQL server if the limit is too high
export async function getTeamPages(
  count: number = 10,
): Promise<Array<TeamPage>> {
  const query = `query {
        teamPageCollection(limit: ${count}) {
            items {
                title
                headline
                sectionsCollection {
                    items {
                        title
                        headline
                        mainContent {
                            json
                        }
                        teamMembersCollection(limit: 20) {
                            items {
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
            }
        }
    }`

  const response = await typedFetchGraphQL<{
    teamPageCollection: { items: Array<TeamPage> }
  }>(query)

  if (!response.data) {
    console.error("Failed to fetch Team Pages", response.errors)

    return []
  }

  const teamPages = response.data.teamPageCollection.items

  return validateWithSchema(TeamPagesSchema, teamPages)
}
