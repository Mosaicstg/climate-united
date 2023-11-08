import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"

/**
 * query {
 *   sectionTextMultiImageSplit(id: "4qhsdzV9DqYubfFu1Ku4Wy") {
 *     title
 *     mainContent {
 *       json
 *     }
 *     featuredImagesCollection {
 *       items {
 *         fileName
 *         url
 *         width
 *         height
 *       }
 *     }
 *   }
 * }
 */

export const SectionTextMultiImageSplitSchema = z.object({
  title: z.string(),
  mainContent: RichTextSchema,
  featuredImagesCollection: z.object({
    items: ImageSchema.array(),
  }),
})

export type SectionTextMultiImageSplit = z.infer<
  typeof SectionTextMultiImageSplitSchema
>
