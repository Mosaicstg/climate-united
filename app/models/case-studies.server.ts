import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "./seo.server"

export const CaseStudiesPageSchema = z.object({
  title: z.string(),
  headline: z.string().nullable().optional(),
  mainContent: RichTextSchema.nullable().optional(),
  featuredImage: ImageSchema,
  seo: SEOSchema,
})

export type CaseStudies = z.infer<typeof CaseStudiesPageSchema>

export async function getCaseStudiesPage(
  id: string,
): Promise<CaseStudies | null> {
  const query = `
        query {
              caseStudies(id: "${id}") {
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
    `

  const response = await typedFetchGraphQL<{
    caseStudies: CaseStudies
  }>(query)

  if (!response.data) {
    console.error(`Error for Case Studies Page with id:${id}`, response.errors)

    return null
  }

  const caseStudiesPage = response.data.caseStudies

  return validateWithSchema(CaseStudiesPageSchema, caseStudiesPage)
}

const CaseStudiesBySlugQuery = `
  query CaseStudiesBySlug($slug: String!) {
    caseStudiesCollection(where: {slug: $slug}, limit: 1) {
      items {
        id
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
  }
`

export async function getCaseStudiesPageBySlug(
  slug: string,
): Promise<CaseStudies | null> {
  const response = await typedFetchGraphQL<{
    caseStudiesCollection: {
      items: Array<CaseStudies>
    }
  }>(CaseStudiesBySlugQuery, { slug })

  if (!response.data) {
    console.error(
      `Error for Case Studies Page with slug:${slug}`,
      response.errors,
    )

    return null
  }

  const caseStudiesPage = response.data.caseStudiesCollection.items[0]

  return validateWithSchema(CaseStudiesPageSchema, caseStudiesPage)
}
