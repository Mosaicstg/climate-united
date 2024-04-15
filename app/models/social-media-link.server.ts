import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"

export const SocialMediaLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  sys: z.object({
    id: z.string(),
  }),
})

export const SocialMediaLinksSchema = SocialMediaLinkSchema.array()

export type SocialMediaLink = z.infer<typeof SocialMediaLinkSchema>

export async function getSocialMediaLinks(count: number = 10) {
  const query = `query {
        socialMediaLinkCollection(limit: ${count}) {
            items {
                sys {
                  id 
                }
                platform
                url
            }
        }
    }`

  const response = await typedFetchGraphQL<{
    socialMediaLinkCollection: { items: Array<SocialMediaLink> }
  }>(query)

  if (!response.data) {
    console.error(`Error for Social Media Links`, response.errors)

    return []
  }

  const links = response.data.socialMediaLinkCollection.items

  return validateWithSchema(SocialMediaLinksSchema, links)
}
