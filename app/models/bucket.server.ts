import { fetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

/**
 * query {
 *   bucketCollection(limit: 100) {
 *     items {
 *       title
 *       bucketText {
 *         json
 *       }
 *       bucketImage {
 *         fileName
 *         description
 *         width
 *         height
 *       }
 *     }
 *   }
 * }
 */

export const BucketSchema = z.object({
  title: z.string(),
  bucketText: RichTextSchema,
  bucketImage: ImageSchema,
})

export const BucketsSchema = BucketSchema.array()

export type Bucket = z.infer<typeof BucketSchema>

export async function getBucket(id: string): Promise<Bucket> {
  const query = `query {
      bucket(id: "${id}") {
          title
          bucketText {
            json
          }
          bucketImage {
            fileName
            description
            width
            height
          }
      }
  }`

  const response = await fetchGraphQL(query)
  const teamMember = response.data.teamMember

  return validateWithSchema(BucketSchema, teamMember)
}

export async function getBuckets(count: number = 10): Promise<Array<Bucket>> {
  const query = `query {
  bucketCollection(limit: 100) {
    items {
      title
      bucketText {
        json
      }
      bucketImage {
        fileName
        description
        width
        height
      }
    }
  }
}`

  const response = await fetchGraphQL(query)
  const teamMembers = response.data.teamMemberCollection.items

  return validateWithSchema(BucketsSchema, teamMembers)
}
