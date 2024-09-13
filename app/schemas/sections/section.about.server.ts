import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { ImageSchema } from "../contentful-fields/image.server"

/**
 * query {
 *   sectionAbout(id: "5zxpiGycKyUEfLiDTPwycz") {
 *     title
 *     mainContent {
 *       json
 *       links {
 *             entries {
 *              hyperlink {
 *                sys {
 *                  id
 *                }
 *                __typename
 *                ... on Page {
 *                     slug
 *                }
 *                 ... on TeamPage {
 *                       slug
 *                 }
 *                 ... on CaseStudies {
 *                       slug
 *                 }
 *                 ... on AboutPage {
 *                       slug
 *                 }
 *                 ... on LandingPage {
 *                       slug
 *                 }
 *                 ... on Post {
 *                       slug
 *                 }
 *              }
 *             }
 *             assets {
 *               block {
 *                 sys {
 *                   id
 *                 }
 *                 url
 *                 title
 *                 width
 *                 height
 *                 description
 *                 fileName
 *                 contentType
 *               }
 *               hyperlink {
 *                 sys {
 *                   id
 *                 }
 *                 url
 *                 fileName
 *               }
 *             }
 *           }
 *     }
 *     featuredImage {
 *       fileName
 *       url
 *       description
 *       width
 *       height
 *     }
 *   }
 * }
 */

export const SectionAboutSchema = z.object({
  title: z.string(),
  mainContent: RichTextSchema.passthrough(),
  featuredImage: ImageSchema.nullable().optional(),
  imagesCollection: z.object({
    items: ImageSchema.array(),
  }),
})

export type SectionAbout = z.infer<typeof SectionAboutSchema>
