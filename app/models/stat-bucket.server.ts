import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const StatBucketSchema = z.object({
  title: z.string(),
  headline: z.string().nullable().optional(),
  subheadline: z.string().nullable().optional(),
  bucketText: RichTextSchema.nullable().optional(),
  bucketImage: ImageSchema.nullable().optional(),
  link: z.string().nullable().optional(),
})

export const StatBucketsSchema = StatBucketSchema.array()

export type StatBucket = z.infer<typeof StatBucketSchema>

export async function getStatBucket(id: string) {
  const query = `query {
      statBucket(id: "${id}") {
          title
          headline
          subheadline
          bucketText {
            json
          }
          bucketImage {
            fileName
            description
            width
            height
          }
          link
      }
  }`

  const response = await typedFetchGraphQL<{ bucket: StatBucket }>(query)

  if (!response.data) {
    console.error(`Error for StatBucket with id:${id}`, response.errors)

    return null
  }

  const bucket = response.data.bucket

  return validateWithSchema(StatBucketSchema, bucket)
}

export async function getStatBuckets(count: number = 10) {
  const query = `query {
  statBucketCollection(limit: 100) {
    items {
      title
      headline
      subheadline
      bucketText {
        json
      }
      bucketImage {
        fileName
        description
        width
        height
      }
      link
    }
  }
}`

  const response = await typedFetchGraphQL<{
    bucketCollection: { items: Array<StatBucket> }
  }>(query)

  if (!response.data) {
    console.error(`Error for StatBuckets`, response.errors)

    return []
  }

  const buckets = response.data.bucketCollection.items

  return validateWithSchema(StatBucketsSchema, buckets)
}
