import { fetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"

// query {
//     resourceCollection(limit:100) {
//         items {
//             title
//             file {
//                 fileName
//                 url
//             }
//         }
//     }
// }
export const ResourceSchema = z.object({
  title: z.string(),
  file: z.object({
    fileName: z.string(),
    url: z.string(),
  }),
})

export const ResourcesSchema = ResourceSchema.array()

export type Resource = z.infer<typeof ResourceSchema>

export async function getResource(id: string): Promise<Resource> {
  const query = `query {
            resource(id: "${id}") {
                title
                file {
                    fileName
                    url
                }
            }
        }`

  const response = await fetchGraphQL(query)
  const resource = response.data.resource

  return validateWithSchema(ResourceSchema, resource)
}

export async function getResources(
  count: number = 10,
): Promise<Array<Resource>> {
  const query = `query {
        resourceCollection(limit: ${count}) {
            items {
                title
                file {
                    fileName
                    url
                }
            }
        }
    }`

  const response = await fetchGraphQL(query)
  const resources = response.data.resourceCollection.items

  return validateWithSchema(ResourcesSchema, resources)
}
