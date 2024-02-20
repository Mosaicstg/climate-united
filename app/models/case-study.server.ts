import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { SEOSchema } from "~/models/seo.server"
import { EPARegionSchema } from "~/models/epa-region.server"

export const CaseStudySchema = z.object({
  slug: z.string().nullable().optional(),
  title: z.string(),
  headline: z.string(),
  excerpt: RichTextSchema.nullable().optional(),
  mainContent: RichTextSchema.nullable().optional(),
  featuredImage: ImageSchema.optional(),
  epaRegion: EPARegionSchema.optional(),
  seo: SEOSchema.nullable().optional(),
})

export const CaseStudiesSchema = z.array(CaseStudySchema)

export type CaseStudy = z.infer<typeof CaseStudySchema>

export async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  const query = `
    query {
        caseStudy(id: "${id}") {
            slug
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

export async function getCaseStudies(count: number = 10) {
  const query = `
        query {
            caseStudyCollection(limit: ${count}, order: sys_publishedAt_DESC) {
                items {
                    slug
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
                    epaRegion {
                        name
                        slug
                        description
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

export async function getCaseStudyBySlug(slug: string) {
  const query = `query {
        caseStudyCollection(limit: 1, where: { slug: "${slug}" }) {
            items {
                slug
                title
                headline
                mainContent {
                    json
                }
                featuredImage {
                    fileName
                    url
                    description
                    width
                    height
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

  const response = await typedFetchGraphQL<{
    caseStudyCollection: { items: Array<CaseStudy> }
  }>(query)

  if (!response.data) {
    console.error(`Error for Case Study with slug: ${slug}`, response.errors)

    return null
  }

  const study = response.data.caseStudyCollection.items[0]

  return validateWithSchema(CaseStudySchema, study)
}
