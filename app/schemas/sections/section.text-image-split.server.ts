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
 *     imageAlignment
 *     imageShape
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
  title: z.string(),
  mainContent: RichTextSchema,
  imageAlignment: z.string(),
  imageShape: z.string(),
  featuredImage: ImageSchema,
})

export type SectionTextImageSplit = z.infer<typeof SectionTextImageSplitSchema>
