import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"

/**
 * query {
 *   sectionTextImage(id: "2gpeo93gHR7xEozkIW7FRx") {
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

export const SectionTextImageSchema = z.object({
  title: z.string(),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema,
})

export type SectionTextImage = z.infer<typeof SectionTextImageSchema>
