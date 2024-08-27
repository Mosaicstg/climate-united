import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"

/**
 * query {
 *   sectionStatBucketGrid(id: "2JIdKZJRekb2j33kloXtNM") {
 *     title
 *     headline
 *     mainContent {
 *       json
 *     }
 *     statBucketsCollection {
 *       items {
 *         headline
 *         subheadline
 *         bucketText {
 *           json
 *         }
 *         bucketImage {
 *           fileName
 *           url
 *           width
 *           height
 *         }
 *         link
 *       }
 *     }
 *   }
 * }
 */

export const SectionStatBucketGridSchema = z.object({
  title: z.string(),
  headline: z.string(),
  mainContent: RichTextSchema,
  statBucketsCollection: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        headline: z.string().nullable().optional(),
        subheadline: z.string().nullable().optional(),
        bucketText: RichTextSchema.nullable().optional(),
        bucketImage: ImageSchema.nullable().optional(),
        link: z.string().nullable().optional(),
      }),
    ),
  }),
})

export type SectionStatBucketGrid = z.infer<typeof SectionStatBucketGridSchema>
