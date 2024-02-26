import { z } from "zod"

export const VideoSchema = z.object({
  title: z.string(),
  videoIdEnglish: z.string().nullable(),
  videoIdSpanish: z.string().nullable(),
})

export type Video = z.infer<typeof VideoSchema>
