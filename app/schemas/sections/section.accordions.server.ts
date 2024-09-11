import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { AccordionItemSchema } from "~/models/accordion-item.server"

/**
 * query {
 *   sectionAccordion(id: "2JIdKZJRekb2j33kloXtNM") {
 *     title
 *     headline
 *     mainContent {
 *       json
 *     }
 *     accordionItemsCollection {
 *       items {
 *         title
 *         headline
 *         mainContent {
 *           json
 *         }
 *       }
 *     }
 *   }
 * }
 */

export const SectionAccordionsSchema = z.object({
  title: z.string(),
  headline: z.string(),
  mainContent: RichTextSchema,
  accordionItemsCollection: z.object({
    items: z.array(AccordionItemSchema),
  }),
})

export type SectionAccordions = z.infer<typeof SectionAccordionsSchema>
