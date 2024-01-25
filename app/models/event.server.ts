import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { SEOSchema } from "./seo.server"

export const EventSchema = z.object({
  title: z.string(),
  slug: z.string(),
  headline: z.string(),
  datetime: z.string(),
  location: z.string(),
  excerpt: RichTextSchema.nullable().optional(),
  mainContent: RichTextSchema,
  seo: SEOSchema
})

export const EventsSchema = EventSchema.array()

export type Event = z.infer<typeof EventSchema>

export async function getEventBySlug(slug: string) {
  const query = `query {
        eventCollection(where: { slug: "${slug}" }) {
            items {
                title
                slug
                headline
                datetime
                location
                excerpt {
                    json
                }
                mainContent {
                    json
                }
                seo {
                  title
                  excerpt
                  image {
                    fileName
                    url
                    description
                    width
                    height
                  }
                  keywords
                }
            }
        }
    }`

  const response = await typedFetchGraphQL<{ eventCollection: { items: Array<Event> } }>(query)

  if (!response.data) {
    console.error(`Error for Event with slug:${slug}`, response.errors)

    return null
  }

  return response.data.eventCollection.items[0]
}

export async function getEvents(count: number = 10) {
  const query = `
        query {
            eventCollection(order:sys_firstPublishedAt_DESC limit: ${count}) {
                items {
                    title
                    slug
                    headline
                    datetime
                    location
                    excerpt {
                        json
                    }
                    mainContent {
                        json
                    }
                    seo {
                      title
                      excerpt
                      image {
                        fileName
                        url
                        description
                        width
                        height
                      }
                      keywords
                    }
                }
            }
        }`

  const response = await typedFetchGraphQL<{ eventCollection: { items: Array<Event> } }>(query)

  if (!response.data) {
    console.error(`Error for Events`, response.errors)

    return []
  }

  const events = response.data.eventCollection.items

  return validateWithSchema(EventsSchema, events)
}
