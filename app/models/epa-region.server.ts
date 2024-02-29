import { z } from "zod"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { type CaseStudy } from "./case-study.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"

export const EPARegionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
})

export const EPARegionsWithCaseStudiesSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  linkedFrom: z.object({
    caseStudyCollection: z.object({
      items: z
        .object({
          slug: z.string(),
          title: z.string(),
          headline: z.string(),
          category: z.string().nullable().optional(),
          location: z.string().nullable().optional(),
          excerpt: RichTextSchema.nullable().optional(),
        })
        .array(),
    }),
  }),
})

export type EPARegion = z.infer<typeof EPARegionSchema>

export const CaseStudyByRepaRegionSchema = z.object({
  title: z.string(),
  slug: z.string(),
  headline: z.string(),
  location: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  epaRegion: z.object({
    name: z.string(),
    description: z.string().optional().nullable(),
  }),
})

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
                    description
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

  const result = EPARegionSchema.array().safeParse(epaRegions)

  if (!result.success) {
    console.error("Failed to validate EPA regions", result.error)

    return []
  }

  return [
    ...result.data.sort((regionA, regionB) => {
      return (
        regionA.slug.toLowerCase().length - regionB.slug.toLowerCase().length
      )
    }),
  ]
}

/**
 * @throws {Response} If the fetch fails or the response is not valid
 */
export async function getCaseStudyByEPARegionSlug(slug: string) {
  const query = `query {
        caseStudyCollection( where: { epaRegion: { slug: "${slug}" } }, order: sys_publishedAt_DESC) {
            items {
                title
                slug
                headline
                category
                location
                epaRegion {
                    name
                    description
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

  return validateWithSchema(CaseStudyByRepaRegionSchema.array(), caseStudies)
}

export async function getEPARegionsWithCaseStudies() {
  const query = `
        query {
            epaRegionCollection(limit: 100, order: slug_ASC) {
                items {
                    name
                    slug
                    description
                    linkedFrom {
                        caseStudyCollection(limit: 10, order: sys_publishedAt_DESC) {
                            items {
                                slug
                                title
                                headline
                                category
                                location
                                excerpt {
                                    json
                                }
                            }
                        }
                    }
                }
            }
        }
    `
  let response

  try {
    response = await typedFetchGraphQL<{
      epaRegionCollection: {
        items: Array<z.infer<typeof EPARegionsWithCaseStudiesSchema>>
      }
    }>(query)
  } catch (e) {
    console.error("Failed to fetch EPA regions with case studies", e)

    return []
  }

  if (!response.data) {
    console.error(
      "Failed to fetch EPA regions with case studies",
      response.errors,
    )

    return []
  }

  const epaRegions = response.data.epaRegionCollection.items

  const result = EPARegionsWithCaseStudiesSchema.array().safeParse(epaRegions)

  if (!result.success) {
    console.error(
      "Failed to validate EPA regions with case studies",
      result.error,
    )

    return []
  }

  // Sort the regions by length of slug
  // This is to ensure that the regions are displayed in the correct order
  // Contentful sends down regions in order except for `region-10` which is sent before `region-2`
  return [
    ...result.data.sort((regionA, regionB) => {
      return (
        regionA.slug.toLowerCase().length - regionB.slug.toLowerCase().length
      )
    }),
  ]
}
