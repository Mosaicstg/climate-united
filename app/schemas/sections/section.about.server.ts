import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"

/**
 * query {
 *   sectionAbout(id: "5zxpiGycKyUEfLiDTPwycz") {
 *     title
 *     mainContent {
 *       json
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       description
 *       width
 *       height
 *     }
 *   }
 * }
 */

export const SectionAboutSchema = z.object({
  title: z.string(),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema.nullable().optional(),
  imagesCollection: z.object({
    items: ImageSchema.array(),
  }),
})

export type SectionAbout = z.infer<typeof SectionAboutSchema>
