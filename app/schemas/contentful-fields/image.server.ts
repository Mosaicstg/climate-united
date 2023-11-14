import { z } from "zod"

export const ImageSchema = z.object({
  fileName: z.string(),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
  description: z.string().nullable().optional(),
})

export type Image = z.infer<typeof ImageSchema>
