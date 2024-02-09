import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "~/models/seo.server"

export const TeamMemberSchema = z.object({
  slug: z.string(),
  name: z.string(),
  position: z.string(),
  department: z.string(),
  mainContent: RichTextSchema.nullable().optional(),
  featuredImage: ImageSchema,
  seo: SEOSchema.nullable().optional(),
})

export const TeamMembersSchema = TeamMemberSchema.array()

export type TeamMember = z.infer<typeof TeamMemberSchema>

export async function getTeamMember(id: string) {
  const query = `query {
            teamMember(id: "${id}") {
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
        }`

  const response = await typedFetchGraphQL<{ teamMember: TeamMember }>(query)

  if (!response.data) {
    console.error(`Error for Team Member with id:${id}`, response.errors)

    return null
  }

  const teamMember = response.data.teamMember

  return validateWithSchema(TeamMemberSchema, teamMember)
}

export async function getTeamMembers(count: number = 10) {
  const query = `query {
  teamMemberCollection(limit: 100, order: sys_publishedAt_DESC) {
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
}`

  const response = await typedFetchGraphQL<{
    teamMemberCollection: { items: Array<TeamMember> }
  }>(query)

  if (!response.data) {
    console.error(`Error for Team Members`, response.errors)

    return []
  }

  const teamMembers = response.data.teamMemberCollection.items

  return validateWithSchema(TeamMembersSchema, teamMembers)
}

export async function getTeamMemberBySlug(slug: string) {
  const query = `query {
        teamMemberCollection(where: { slug: "${slug}" }) {
            items {
                slug
                name
                position
                department
                mainContent {
                    json
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
    }`

  const response = await typedFetchGraphQL<{
    teamMemberCollection: { items: Array<TeamMember> }
  }>(query)

  if (!response.data) {
    console.error(`Error for Member with slug: ${slug}`, response.errors)

    return null
  }

  const member = response.data.teamMemberCollection.items[0]

  return validateWithSchema(TeamMemberSchema, member)
}
