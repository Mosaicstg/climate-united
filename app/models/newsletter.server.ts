import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const NewsletterSchema = z.object({
  headline: z.string(),
  mainContent: RichTextSchema.nullable(),
})

export type NewsletterContent = z.infer<typeof NewsletterSchema>

export async function getNewsletterContent() {
  const query = `query {
  newsletterCollection(limit: 1) {
    items {
      headline
      mainContent {
        json
      }
    }
  }
}`

  const response = await typedFetchGraphQL<{
    newsletterCollection: { items: Array<NewsletterContent> }
  }>(query)

  if (!response.data) {
    console.error(`Error getting Newsletter Content`, response.errors)

    return null
  }

  const newsletter = response.data.newsletterCollection.items[0]

  return validateWithSchema(NewsletterSchema, newsletter)
}
