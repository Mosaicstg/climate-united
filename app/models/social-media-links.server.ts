import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"

export const SocialMediaLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
})

export const SocialMediaLinksSchema = SocialMediaLinkSchema.array()

export type SocialMediaLink = z.infer<typeof SocialMediaLinkSchema>

export async function getSocialMediaLinks() {
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

  const response = await typedFetchGraphQL<{ socialMediaLinkCollection: { items: Array<SocialMediaLink> } }>(query)

  if (!response.data) {
    console.error("Failed to fetch social media links", response.errors)

    return []
  }

  const socialMediaLinks = response.data.socialMediaLinkCollection.items

  return validateWithSchema(SocialMediaLinksSchema, socialMediaLinks)
}
