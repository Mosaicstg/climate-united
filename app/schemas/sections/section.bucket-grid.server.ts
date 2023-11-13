import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"

/**
 * query {
 *   sectionBucketGrid(id: "2JIdKZJRekb2j33kloXtNM") {
 *     title
 *     headline
 *     mainContent {
 *       json
 *     }
 *     bucketsCollection {
 *       items {
 *         bucketText {
 *           json
 *         }
 *         bucketImage {
 *           fileName
 *           url
 *           width
 *           height
 *         }
 *       }
 *     }
 *   }
 * }
 */

export const SectionBucketGridSchema = z.object({
  title: z.string(),
  headline: z.string(),
  mainContent: RichTextSchema,
  bucketsCollection: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        bucketText: RichTextSchema,
        bucketImage: ImageSchema,
      }),
    ),
  }),
})

export type SectionBucketGrid = z.infer<typeof SectionBucketGridSchema>
