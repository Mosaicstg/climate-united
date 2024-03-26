import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const FooterSchema = z.object({
  contactInfo: RichTextSchema.nullable(),
  mainContent: RichTextSchema.nullable(),
})

export type FooterContent = z.infer<typeof FooterSchema>

export async function getFooterContent() {
  const query = `query {
  footerCollection(limit: 1) {
    items {
      contactInfo {
        json
      }
      mainContent {
        json
      }
    }
  }
}`

  const response = await typedFetchGraphQL<{
    footerCollection: { items: Array<FooterContent> }
  }>(query)

  if (!response.data) {
    console.error(`Error getting Footer Content`, response.errors)

    return null
  }

  const footer = response.data.footerCollection.items[0]

  return validateWithSchema(FooterSchema, footer)
}
