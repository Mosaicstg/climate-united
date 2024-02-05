import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

export const TeamMemberSchema = z.object({
  name: z.string(),
  position: z.string(),
  department: z.string(),
  featuredImage: ImageSchema.nullable().optional(),
})

export const TeamMembersSchema = TeamMemberSchema.array()

export type TeamMember = z.infer<typeof TeamMemberSchema>

export async function getTeamMember(id: string) {
  const query = `query {
            teamMember(id: "${id}") {
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

export async function getTeamMembers(
  count: number = 10,
) {
  const query = `query {
  teamMemberCollection(limit: 100, order: sys_publishedAt_DESC) {
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
}`

  const response = await typedFetchGraphQL<{ teamMemberCollection: { items: Array<TeamMember> } }>(query)

  if (!response.data) {
    console.error(`Error for Team Members`, response.errors)

    return []
  }

  const teamMembers = response.data.teamMemberCollection.items

  return validateWithSchema(TeamMembersSchema, teamMembers)
}
