import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

export const NewsletterSchema = z.object({
  headline: z.string(),
  mainContent: RichTextSchema.nullable(),
  featuredImage: ImageSchema,
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
      featuredImage {
        fileName
        url
        description
        width
        height
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
