import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import {
  safeValidateWithSchema,
  validateWithSchema,
} from "~/utils/validate-with-schema.server"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "./seo.server"

export const PageSchema = z.object({
  title: z.string(),
  headline: z.string(),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema.nullable().optional(),
  seo: SEOSchema,
})

export type Page = z.infer<typeof PageSchema>

export async function getPage(id: string) {
  const query = `
        query {
            page(id: "${id}") {
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

  const response = await typedFetchGraphQL<{ page: Page }>(query)

  if (!response.data) {
    console.error(`Error for Page with id:${id}`, response.errors)

    return null
  }

  const page = response.data.page

  return validateWithSchema(PageSchema, page)
}

export const PageBySlugQuery = `
  query PageBySlug($slug: String!) {
    pageCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        headline
        mainContent {
          json
          links {
            entries {
             hyperlink {
               sys {
                 id
               }
               __typename
               ... on Page {
                    slug
               }
                ... on TeamPage {
                      slug
                }
                ... on CaseStudies {
                      slug
                }
                ... on AboutPage {
                      slug
                }
                ... on LandingPage {
                      slug
                }
                ... on Post {
                      slug
                }
             }
            }
          } 
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
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await typedFetchGraphQL<{
    pageCollection: { items: Array<Page> }
  }>(PageBySlugQuery, { slug })

  console.log(response)

  if (!response.data) {
    console.error(`Error for Page with slug:${slug}`, response.errors)

    return null
  }

  const page = response.data.pageCollection.items[0]

  const result = PageSchema.safeParse(page)

  if (!result.success) {
    const errors = result.error.flatten()

    console.error(`Error for Page with slug:${slug}`, errors)

    return null
  }

  return page as Page
}
