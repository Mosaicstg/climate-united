import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"

export const ResourceSchema = z.object({
  title: z.string(),
  file: z.object({
    fileName: z.string(),
    url: z.string(),
  }),
})

export const ResourcesSchema = ResourceSchema.array()

export type Resource = z.infer<typeof ResourceSchema>

export async function getResource(id: string) {
  const query = `query {
            resource(id: "${id}") {
                title
                file {
                    fileName
                    url
                }
            }
        }`

  const response = await typedFetchGraphQL<{ resource: Resource }>(query)

  if (!response.data) {
    console.error(`Error for Resource with id:${id}`, response.errors)

    return null
  }

  const resource = response.data.resource

  return validateWithSchema(ResourceSchema, resource)
}

export async function getResources(count: number = 10) {
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

  const response = await typedFetchGraphQL<{ resourceCollection: { items: Array<Resource> } }>(query)

  if (!response.data) {
    console.error(`Error for Resources`, response.errors)

    return []
  }

  const resources = response.data.resourceCollection.items

  return validateWithSchema(ResourcesSchema, resources)
}
