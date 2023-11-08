import { fetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema"

export const SocialMediaLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
})

export const SocialMediaLinksSchema = SocialMediaLinkSchema.array()

export type SocialMediaLink = z.infer<typeof SocialMediaLinkSchema>

export async function getSocialMediaLinks(): Promise<Array<SocialMediaLink>> {
  const query = `
       query {
            socialMediaLinkCollection(limit: 6, order: [platform_ASC]) {
                items {
                    platform
                    url
                }
            }
        } 
    `

  const response = await fetchGraphQL(query)
  const socialMediaLinks = response.data.socialMediaLinkCollection.items

  return validateWithSchema(SocialMediaLinksSchema, socialMediaLinks)
}
