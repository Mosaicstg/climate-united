import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
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
    pageCollection(where: { slug: $slug }) {
      items {
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
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await typedFetchGraphQL<{
    pageCollection: { items: Array<Page> }
  }>(PageBySlugQuery, { slug })

  if (!response.data) {
    console.error(`Error for Page with slug:${slug}`, response.errors)

    return null
  }

  const page = response.data.pageCollection.items[0]

  return validateWithSchema(PageSchema, page)
}
