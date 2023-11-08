import { fetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

// query {
//     eventCollection(limit: 100) {
//         items {
//             headline
//             datetime
//             excerpt {
//                 json
//             }
//             content {
//                 json
//             }
//         }
//     }
// }

export const EventSchema = z.object({
  title: z.string(),
  headline: z.string(),
  datetime: z.string(),
  excerpt: RichTextSchema,
  mainContent: RichTextSchema,
})

export const EventsSchema = EventSchema.array()

export type Event = z.infer<typeof EventSchema>

export async function getEvent(id: string): Promise<Event> {
  const query = `
    query {
        event(id: "${id}") {
            title
            headline
            datetime
            excerpt {
                json
            }
            mainContent {
                json
            }
        }
    }
    `

  const response = await fetchGraphQL(query)
  const event = response.data.event

  return validateWithSchema(EventSchema, event)
}

export async function getEvents(count: number = 3): Promise<Event[]> {
  const query = `
        query {
            eventCollection(order:sys_firstPublishedAt_DESC limit: ${count}) {
                items {
                    title
                    headline
                    datetime
                    excerpt {
                        json
                    }
                    mainContent {
                        json
                    }
                }
            }  
        }`

  const response = await fetchGraphQL(query)
  const events = response.data.eventCollection.items

  return validateWithSchema(EventsSchema, events)
}
