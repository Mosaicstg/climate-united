import { z } from "zod"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import {
  LinksSchema,
  RichTextSchema,
  createRichTextSchemaWithEmbeddedAssets,
} from "~/schemas/contentful-fields/rich-text.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { SEOSchema } from "~/models/seo.server"
import { EPARegionSchema } from "~/models/epa-region.server"
import { VideoSchema } from "~/models/video.server"

export const CaseStudySchema = z.object({
  title: z.string(),
  slug: z.string().nullable().optional(),
  partnerLogo: ImageSchema.nullable().optional(),
  headline: z.string(),
  epaRegion: EPARegionSchema.optional(),
  category: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: RichTextSchema.nullable().optional(),
  mainImage: ImageSchema.nullable().optional(),
  mainContent: createRichTextSchemaWithEmbeddedAssets(
    z.object({
      links: LinksSchema,
    }),
  )
    .nullable()
    .optional(),
  video: VideoSchema.nullable().optional(),
  excerpt: RichTextSchema.nullable().optional(),
  ctaText: z.string().nullable().optional(),
  ctaUrl: z.string().nullable().optional(),
  featuredImage: ImageSchema.optional(),
  seo: SEOSchema.nullable().optional(),
})

export const CaseStudiesSchema = z.array(CaseStudySchema)

export type CaseStudy = z.infer<typeof CaseStudySchema>

export async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  const query = `
    query {
        caseStudy(id: "${id}") {
            title
            slug
            headline
            category
            location
            excerpt {
                json
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
                    title
                    slug
                    headline
                    category
                    excerpt {
                        json
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
                title
                slug
                headline
                partnerLogo {
                    fileName
                    url
                    description
                    width
                    height
                }
                category
                location
                description {
                    json
                }
                mainImage {
                    fileName
                    url
                    description
                    width
                    height
                }
                video {
                  title
                  videoIdEnglish
                  videoIdSpanish
                }
                mainContent {
                  json
                  links {
                    assets {
                      block {
                        sys {
                          id
                        }
                        url
                        title
                        width
                        height
                        description
                        fileName
                      }
                    }
                  }
                }
                ctaText
                ctaUrl
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
