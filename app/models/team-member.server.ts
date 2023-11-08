import { fetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema"
import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

// query {
//     teamMemberCollection(limit: 100) {
//         items {
//             name
//             position
//             department
//             featuredImage {
//                 fileName
//                 url
//                 description
//                 width
//                 height
//             }
//         }
//     }
// }

// {
//     "data": {
//     "teamMemberCollection": {
//         "items": [
//             {
//                 "name": "Caroline Nowery",
//                 "position": "Sr. Vice President, Chief External Affairs Officer",
//                 "department": "Virginia Community Capital",
//                 "featuredImage": {
//                     "fileName": "Electric cooking.png",
//                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
//                     "description": "Stir Fry. Yum!",
//                     "width": 577,
//                     "height": 603
//                 }
//             }
//         ]
//     }
// }
// }

export const TeamMemberSchema = z.object({
  name: z.string(),
  position: z.string(),
  department: z.string(),
  featuredImage: ImageSchema,
})

export const TeamMembersSchema = TeamMemberSchema.array()

export type TeamMember = z.infer<typeof TeamMemberSchema>

export async function getTeamMember(id: string): Promise<TeamMember> {
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

  const response = await fetchGraphQL(query)
  const teamMember = response.data.teamMember

  return validateWithSchema(TeamMemberSchema, teamMember)
}

export async function getTeamMembers(
  count: number = 10,
): Promise<TeamMember[]> {
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

  const response = await fetchGraphQL(query)
  const teamMembers = response.data.teamMemberCollection.items

  return validateWithSchema(TeamMembersSchema, teamMembers)
}
