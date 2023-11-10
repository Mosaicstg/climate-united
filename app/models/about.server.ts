import { z } from "zod"
import { CaseStudySchema } from "./case-study.server"
import { SectionAboutSchema } from "~/schemas/sections/section.about.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"

/**
 * query {
 *   aboutPage(id: "6wHRbfqkflPjD7tVNmz4C") {
 *     title
 *     sectionsCollection {
 *       items {
 *         title
 *         mainContent {
 *           json
 *         }
 *         featuredImage {
 *           fileName
 *           url
 *           description
 *           width
 *           height
 *         }
 *       }
 *     }
 *     caseStudiesHeadline
 *     caseStudiesCollection {
 *       items {
 *         title
 *         headline
 *         excerpt {
 *           json
 *         }
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

export const AboutPageSchema = z.object({
  title: z.string(),
  sectionsCollection: z.object({
    items: z.array(SectionAboutSchema),
  }),
  caseStudiesHeadline: z.string(),
  caseStudiesCollection: z.object({
    items: z.array(CaseStudySchema),
  }),
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
                }
            }
            caseStudiesHeadline
            caseStudiesCollection {
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

export async function getAboutPages(
  count: number = 10,
): Promise<Array<AboutPage>> {
  const query = `
    query {
        aboutPageCollection(limit: ${count}) {
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
                    }
                }
                caseStudiesHeadline
                caseStudiesCollection {
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
            }
        }
    }`

  const response = await typedFetchGraphQL<{
    aboutPageCollection: { items: Array<AboutPage> }
  }>(query)

  if (!response.data) {
    console.error(`Error for About Page collection`, response.errors)

    return []
  }

  const aboutPages = response.data.aboutPageCollection.items

  return validateWithSchema(AboutPagesSchema, aboutPages)
}
