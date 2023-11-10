import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema"

/**
 * query {
 *   caseStudy(id: "6ueMOUJagDMrM14R1W64Nn") {
 *     title
 *     headline
 *     excerpt {
 *       json
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

export const CaseStudySchema = z.object({
  title: z.string(),
  headline: z.string(),
  excerpt: RichTextSchema.nullable().optional(),
  featuredImage: ImageSchema.nullable().optional(),
})

export const CaseStudiesSchema = z.array(CaseStudySchema)

export type CaseStudy = z.infer<typeof CaseStudySchema>

export async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  const query = `
    query {
        caseStudy(id: "${id}") {
            title
            headline
            excerpt {
                json
            }
            featuredImage {
                fileName
                url
                description
                width
                height
            }
        }
    }`

  const response = await typedFetchGraphQL<{ caseStudy: CaseStudy }>(query)

  if (!response.data) {
    console.error(`Error for Case Study with id:${id}`, response.errors)

    return null
  }

  const caseStudy = response.data.caseStudy

  return validateWithSchema(CaseStudySchema, caseStudy)
}

export async function getCaseStudies(
  count: number = 10,
): Promise<Array<CaseStudy>> {
  const query = `
        query {
            caseStudyCollection(limit: ${count}, order: sys_publishedAt_DESC) {
                items {
                    title
                    headline
                    excerpt {
                        json
                    }
                    featuredImage {
                        fileName
                        url
                        description
                        width
                        height
                    }
                }
            }
        }`

  const response = await typedFetchGraphQL<{
    caseStudyCollection: { items: Array<CaseStudy> }
  }>(query)

  if (!response.data) {
    console.error(`Error for Case Studies`, response.errors)

    return []
  }

  const caseStudies = response.data.caseStudyCollection.items

  return validateWithSchema(CaseStudiesSchema, caseStudies)
}
