import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

export const VideoSchema = z.object({
  title: z.string(),
  videoIdEnglish: z.string().nullable(),
  videoIdSpanish: z.string().nullable(),
  posterImage: ImageSchema,
})

export type Video = z.infer<typeof VideoSchema>
