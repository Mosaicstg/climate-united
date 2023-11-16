import { z } from "zod"
import { ImageSchema } from "../contentful-fields/image.server"
import { ResourceSchema } from "~/models/resource.server"
import { EventSchema } from "~/models/event.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
/**
 * query {
 *   sectionEventsResources(id: "6Kq0GW9PHpAdSwYopevujL") {
 *     title
 *     headlineEvents
 *     eventsCollection {
 *       items {
 *         headline
 *         datetime
 *         excerpt {
 *           json
 *         }
 *       }
 *     }
 *     textEvents {
 *       json
 *     }
 *     headlineResources
 *     resourcesCollection {
 *       items {
 *         title
 *         file {
 *           fileName
 *           url
 *         }
 *       }
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       width
 *       height
 *     }
 *   }
 * }
 */
export const SectionEventsResourcesSchema = z.object({
  title: z.string(),
  headlineEvents: z.string(),
  eventsCollection: z.object({
    items: EventSchema.pick({
      title: true,
      slug: true,
      headline: true,
      datetime: true,
      location: true,
      excerpt: true,
      mainContent: true,
      seo: true,
    }).array(),
  }),
  textEvents: RichTextSchema.nullable().optional(),
  headlineResources: z.string(),
  resourcesCollection: z.object({
    items: ResourceSchema.array(),
  }),
  featuredImage: ImageSchema,
})

export type SectionEventsResources = z.infer<
  typeof SectionEventsResourcesSchema
>
