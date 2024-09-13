import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"
/**
 * query {
 *   sectionHeroSplit(id: "6H6ic1N6LdZqghiMEEyWcE") {
 *     title
 *     mainContent {
 *       json
 *     }
 *     imageAlignment
 *     featuredImage {
 *       fileName
 *       url
 *       width
 *       height
 *     }
 *   }
 * }
 */

export const SectionHeroSplitSchema = z.object({
  title: z.string(),
  mainContent: RichTextSchema,
  imageAlignment: z.string(),
  featuredImage: ImageSchema,
})

export type SectionHeroSplit = z.infer<typeof SectionHeroSplitSchema>
