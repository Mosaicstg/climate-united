import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

export const SEO = z.object({
  title: z.string(),
  excerpt: z.string(),
  keywords: z.string().nullable(),
  image: ImageSchema,
})

export type SEO = z.infer<typeof SEO>
