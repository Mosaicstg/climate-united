import { fetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { SectionHeroSchema } from "~/schemas/sections/section.hero.server"
import { SectionTextMultiImageSplitSchema } from "~/schemas/sections/section.text-multi-image-split.server"
import { SectionBucketGridSchema } from "~/schemas/sections/section.bucket-grid.server"
import { SectionTextImageSchema } from "~/schemas/sections/section.text-image.server"
import { SectionEventsResourcesSchema } from "~/schemas/sections/section.events-resources.server"
import { SectionTextImageSplitSchema } from "~/schemas/sections/section.text-image-split.server"
import { SectionNewsPressReleasesSchema } from "~/schemas/sections/section.news-press-releases.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

/**
 * query {
 *   landingPage(id: "2OVuAnTbko7I7V8nzbBR8K") {
 *     title
 *     sectionsCollection {
 *       items {
 *         __typename
 *         ... on SectionHero {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             description
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionTextMultiImageSplit {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImagesCollection {
 *             items {
 *               fileName
 *               url
 *               width
 *               height
 *             }
 *           }
 *         }
 *         ... on SectionTextImageSplit {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionBucketGrid {
 *           title
 *           headline
 *           mainContent {
 *             json
 *           }
 *           bucketsCollection {
 *             items {
 *               bucketText {
 *                 json
 *               }
 *               bucketImage {
 *                 fileName
 *                 url
 *                 width
 *                 height
 *               }
 *             }
 *           }
 *         }
 *         ... on SectionTextImage {
 *           title
 *           mainContent {
 *             json
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionEventsResources {
 *           title
 *           headlineEvents
 *           eventsCollection {
 *             items {
 *               headline
 *               datetime
 *               excerpt {
 *                 json
 *               }
 *             }
 *           }
 *           headlineResources
 *           resourcesCollection {
 *             items {
 *               title
 *               file {
 *                 fileName
 *                 url
 *               }
 *             }
 *           }
 *           featuredImage {
 *             fileName
 *             url
 *             width
 *             height
 *           }
 *         }
 *         ... on SectionNewsPressReleases {
 *           title
 *           headline
 *           postsCollection {
 *             items {
 *               title
 *               headline
 *               excerpt {
 *                 json
 *               }
 *               featuredImage {
 *                 fileName
 *                 url
 *                 description
 *                 width
 *                 height
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

const SectionsDiscriminatedUnion = z.discriminatedUnion("__typename", [
  SectionHeroSchema.merge(z.object({ __typename: z.literal("SectionHero") })),
  SectionTextMultiImageSplitSchema.merge(
    z.object({ __typename: z.literal("SectionTextMultiImageSplit") }),
  ),
  SectionTextImageSplitSchema.merge(
    z.object({ __typename: z.literal("SectionTextImageSplit") }),
  ),
  SectionBucketGridSchema.merge(
    z.object({ __typename: z.literal("SectionBucketGrid") }),
  ),
  SectionTextImageSchema.merge(
    z.object({ __typename: z.literal("SectionTextImage") }),
  ),
  SectionEventsResourcesSchema.merge(
    z.object({ __typename: z.literal("SectionEventsResources") }),
  ),
  SectionNewsPressReleasesSchema.merge(
    z.object({ __typename: z.literal("SectionNewsPressReleases") }),
  ),
])

export const LandingPageSchema = z.object({
  title: z.string(),
  sectionsCollection: z.object({
    items: z.array(SectionsDiscriminatedUnion),
  }),
  seo: z.object({
    title: z.string(),
    excerpt: z.string(),
    image: ImageSchema,
  }),
})

export type LandingPage = z.infer<typeof LandingPageSchema>

export async function getLandingPage(id: string): Promise<LandingPage> {
  const query = `
    query {
        landingPage(id: "${id}") {
            title
            sectionsCollection {
                items {
                    __typename
                    ... on SectionHero {
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
                    ... on SectionTextMultiImageSplit {
                        title
                        mainContent {
                            json
                        }
                        featuredImagesCollection {
                            items {
                                fileName
                                url
                                width
                                height
                            }
                        }
                    }
                    ... on SectionTextImageSplit {
                        title
                        mainContent {
                            json
                        }
                        featuredImage {
                            fileName
                            url
                            width
                            height
                        }
                    }
                    ... on SectionBucketGrid {
                        title
                        headline
                        mainContent {
                            json
                        }
                        bucketsCollection {
                            items {
                                bucketText {
                                    json
                                }
                                bucketImage {
                                    fileName
                                    url
                                    width
                                    height
                                }
                            }
                        }
                    }
                    ... on SectionTextImage {
                        title
                        mainContent {
                            json
                        }
                        featuredImage { 
                            fileName
                            url
                            width
                            height
                        }
                    }
                    ... on SectionEventsResources {
                        title
                        headlineEvents
                        eventsCollection {
                            items {
                                headline
                                datetime
                                excerpt {
                                    json
                                }
                            }
                        }
                        headlineResources
                        resourcesCollection {
                            items {
                                title
                                file {
                                    fileName
                                    url
                                }
                            }
                        }
                        featuredImage {
                            fileName
                            url
                            width
                            height
                        }
                    }
                    ... on SectionNewsPressReleases {
                        title
                        headline
                        postsCollection {
                            items {
                                title
                                date
                                headline
                                excerpt {
                                    json
                                }
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
                    }
                }
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
            }
        }
    }
    `

  const response = await fetchGraphQL(query)

  const landingPage = response.data.landingPage

  return validateWithSchema(LandingPageSchema, landingPage)
}
