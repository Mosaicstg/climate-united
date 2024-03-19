import { z } from "zod"
import { SectionAboutSchema } from "~/schemas/sections/section.about.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "./seo.server"

export const AboutPageSchema = z.object({
  featuredImage: ImageSchema,
  sectionsCollection: z.object({
    items: z.array(SectionAboutSchema),
  }),
  seo: SEOSchema,
})

export const AboutPagesSchema = z.array(AboutPageSchema)

export type AboutPage = z.infer<typeof AboutPageSchema>

export async function getAboutPage(id: string): Promise<AboutPage | null> {
  const query = `
    query {
        aboutPage(id: "${id}") {
            title
            sectionsCollection {
                items {
                    title
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
                    imagesCollection {
                      items {
                        fileName
                        url
                        width
                        height
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
    }`

  const response = await typedFetchGraphQL<{ aboutPage: AboutPage }>(query)

  if (!response.data) {
    console.error(`Error for About Page with id:${id}`, response.errors)

    return null
  }

  const aboutPage = response.data.aboutPage

  return validateWithSchema(AboutPageSchema, aboutPage)
}

const AboutPageBySlugQuery = `
  query AboutPageBySlug($slug: String!) {
    aboutPageCollection(where: {slug: $slug}, limit: 1) {
      items {
        title
        sectionsCollection {
          items {
            title
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
            imagesCollection {
              items {
                fileName
                url
                width
                height
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

export async function getAboutPageBySlug(
  slug: string,
): Promise<AboutPage | null> {
  const response = await typedFetchGraphQL<{
    aboutPageCollection: { items: Array<AboutPage> }
  }>(AboutPageBySlugQuery, { slug })

  if (!response.data) {
    console.error(`Error for About Page with slug:${slug}`, response.errors)

    return null
  }

  const aboutPage = response.data.aboutPageCollection.items[0]

  return validateWithSchema(AboutPageSchema, aboutPage)
}
