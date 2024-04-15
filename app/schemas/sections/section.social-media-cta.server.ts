import { z } from "zod"
import { SocialMediaLinkSchema } from "~/models/social-media-link.server"

export const SectionSocialMediaCtaSchema = z.object({
  title: z.string(),
  sys: z.object({
    id: z.string(),
  }),
  headline: z.string(),
  socialMediaLinksCollection: z.object({
    items: z.array(SocialMediaLinkSchema),
  }),
})

export type SectionSocialMediaCta = z.infer<typeof SectionSocialMediaCtaSchema>
