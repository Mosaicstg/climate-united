import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const AccordionItemSchema = z.object({
  title: z.string(),
  headline: z.string(),
  mainContent: RichTextSchema,
})

export const AccordionItemsSchema = AccordionItemSchema.array()

export type AccordionItem = z.infer<typeof AccordionItemSchema>

export async function getAccordionItem(id: string) {
  const query = `query {
      accordionItem(id: "${id}") {
          title
          headline
          mainContent {
            json
          }
      }
  }`

  const response = await typedFetchGraphQL<{ accordionItem: AccordionItem }>(
    query,
  )

  if (!response.data) {
    console.error(`Error for AccordionItem with id:${id}`, response.errors)

    return null
  }

  const bucket = response.data.accordionItem

  return validateWithSchema(AccordionItemSchema, bucket)
}

export async function getAccordionItems(count: number = 10) {
  const query = `query {
  accordionItemCollection(limit: 100) {
    items {
      title
      headline
      mainContent {
        json
      }
    }
  }
}`

  const response = await typedFetchGraphQL<{
    accordionItemCollection: { items: Array<AccordionItem> }
  }>(query)

  if (!response.data) {
    console.error(`Error for AccordionItems`, response.errors)

    return []
  }

  const buckets = response.data.accordionItemCollection.items

  return validateWithSchema(AccordionItemsSchema, buckets)
}
