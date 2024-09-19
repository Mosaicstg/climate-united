import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"
import { ButtonSchema } from "~/models/button.server"
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
  buttonsCollection: z.object({
    items: z.array(ButtonSchema),
  }),
  imageAlignment: z.string().nullable(),
  imageShape: z.string().nullable(),
  featuredImage: ImageSchema,
})

export type SectionTextImageSplit = z.infer<typeof SectionTextImageSplitSchema>
