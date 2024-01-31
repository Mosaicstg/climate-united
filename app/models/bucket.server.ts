import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const BucketSchema = z.object({
  title: z.string(),
  bucketText: RichTextSchema,
  bucketImage: ImageSchema,
})

export const BucketsSchema = BucketSchema.array()

export type Bucket = z.infer<typeof BucketSchema>

export async function getBucket(id: string) {
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

  const response = await typedFetchGraphQL<{ bucket: Bucket }>(query)

  if (!response.data) {
    console.error(`Error for Bucket with id:${id}`, response.errors)

    return null
  }

  const bucket = response.data.bucket

  return validateWithSchema(BucketSchema, bucket)
}

export async function getBuckets(count: number = 10) {
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

  const response = await typedFetchGraphQL<{ bucketCollection: { items: Array<Bucket> } }>(query)

  if (!response.data) {
    console.error(`Error for Buckets`, response.errors)

    return []
  }

  const buckets = response.data.bucketCollection.items

  return validateWithSchema(BucketsSchema, buckets)
}
