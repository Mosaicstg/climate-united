import { z } from "zod"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { type CaseStudy, CaseStudySchema } from "./case-study.server"

export const EPARegionSchema = z.object({
  name: z.string(),
  slug: z.string(),
})

export type EPARegion = z.infer<typeof EPARegionSchema>

/**
 * @throws {Response} If the fetch fails or the response is not valid
 */
export async function getEPARegions(limit: number = 10) {
  const query = `
       query {
            epaRegionCollection(limit: ${limit}, order: [name_ASC]) {
                items {
                    name
                    slug
                }
            }
        }
    `

  const response = await typedFetchGraphQL<{
    epaRegionCollection: { items: Array<EPARegion> }
  }>(query)

  if (!response.data) {
    console.error("Failed to fetch EPA regions", response.errors)

    return []
  }

  const epaRegions = response.data.epaRegionCollection.items

  return validateWithSchema(EPARegionSchema.array(), epaRegions)
}

/**
 * @throws {Response} If the fetch fails or the response is not valid
 */
export async function getCaseStudyByEPARegionSlug(slug: string) {
  const query = `query {
        caseStudyCollection( where: { epaRegion: { slug: "${slug}" } }, order: sys_publishedAt_DESC) {
            items {
                title
                headline
                epaRegion {
                    name
                }
            }
        }
    }`

  const response = await typedFetchGraphQL<{
    caseStudyCollection: { items: Array<CaseStudy> }
  }>(query)

  if (!response.data) {
    console.error(
      `Error for Case Study with EPA region slug:${slug}`,
      response.errors,
    )

    return []
  }

  const caseStudies = response.data.caseStudyCollection.items

  return validateWithSchema(CaseStudySchema.passthrough().array(), caseStudies)
}
