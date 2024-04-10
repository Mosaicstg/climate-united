import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"
/**
 * query {
 *   sectionHero(id: "7E9PFj7i75lNfLuEWRMrYX") {
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

export const SectionHeroSchema = z.object({
  title: z.string(),
  sys: z.object({
    id: z.string(),
  }),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema,
})

export type SectionHero = z.infer<typeof SectionHeroSchema>
