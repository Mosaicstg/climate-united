import { z } from "zod"
import { PostSchema } from "~/models/post.server"

/**
 * query {
 *   sectionNewsPressReleases(id: "48PGazH9Rdup7nqoqbGHHc") {
 *     title
 *     headline
 *     postsCollection {
 *       items {
 *         title
 *         headline
 *         excerpt {
 *           json
 *         }
 *         featuredImage {
 *           fileName
 *           url
 *           description
 *           width
 *           height
 *         }
 *       }
 *     }
 *   }
 * }
 */

export const SectionNewsPressReleasesSchema = z.object({
  title: z.string(),
  sys: z.object({
    id: z.string(),
  }),
  headline: z.string(),
  postsCollection: z.object({
    items: PostSchema.array(),
  }),
})

export type SectionNewsPressReleases = z.infer<
  typeof SectionNewsPressReleasesSchema
>
