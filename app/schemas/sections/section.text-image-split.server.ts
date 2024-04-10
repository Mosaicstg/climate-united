import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"
/**
 * query {
 *   sectionTextImageSplit(id: "6H6ic1N6LdZqghiMEEyWcE") {
 *     title
 *     mainContent {
 *       json
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       width
 *       height
 *     }
 *   }
 * }
 */

export const SectionTextImageSplitSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  title: z.string(),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema,
})

export type SectionTextImageSplit = z.infer<typeof SectionTextImageSplitSchema>
