import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const BucketSchema = z.object({
  title: z.string(),
  sys: z.object({
    id: z.string(),
  }),
  bucketText: RichTextSchema,
  bucketImage: ImageSchema,
})

export const BucketsSchema = BucketSchema.array()

export type Bucket = z.infer<typeof BucketSchema>
