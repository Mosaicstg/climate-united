import { z } from "zod"
import { RichTextSchema } from "../contentful-fields/rich-text.server"
import { TeamMemberSchema } from "~/models/team-member.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

/**
 * query {
 *   sectionTeam(id: "6fSd8GmjpafTiew33cozBm") {
 *     title
 *     headline
 *     mainContent {
 *       json
 *     }
 *     teamMembersCollection {
 *       items {
 *         name
 *         position
 *         department
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

export const SectionTeamSchema = z.object({
  title: z.string(),
  headline: z.string().nullable().optional(),
  mainContent: RichTextSchema.nullable().optional(),
  featuredImage: ImageSchema.nullable().optional(),
  teamMembersCollection: z.object({
    items: z.array(TeamMemberSchema),
  }),
})

export type SectionTeam = z.infer<typeof SectionTeamSchema>
