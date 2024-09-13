import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { SectionHeroSchema } from "~/schemas/sections/section.hero.server"
import { SectionHeroSplitSchema } from "~/schemas/sections/section.hero-split.server"
import { SectionTextMultiImageSplitSchema } from "~/schemas/sections/section.text-multi-image-split.server"
import { SectionBucketGridSchema } from "~/schemas/sections/section.bucket-grid.server"
import { SectionStatBucketGridSchema } from "~/schemas/sections/section.stat-bucket-grid.server"
import { SectionTextImageSchema } from "~/schemas/sections/section.text-image.server"
import { SectionEventsResourcesSchema } from "~/schemas/sections/section.events-resources.server"
import { SectionTextImageSplitSchema } from "~/schemas/sections/section.text-image-split.server"
import { SectionNewsPressReleasesSchema } from "~/schemas/sections/section.news-press-releases.server"
import { SectionSocialMediaCtaSchema } from "~/schemas/sections/section.social-media-cta.server"
import { SectionAboutSchema } from "~/schemas/sections/section.about.server"
import { SectionAccordionsSchema } from "~/schemas/sections/section.accordions.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { SEOSchema } from "./seo.server"

const SectionsDiscriminatedUnion = z.discriminatedUnion("__typename", [
  SectionHeroSchema.merge(z.object({ __typename: z.literal("SectionHero") })),
  SectionHeroSplitSchema.merge(
    z.object({ __typename: z.literal("SectionHeroSplit") }),
  ),
  SectionTextMultiImageSplitSchema.merge(
    z.object({ __typename: z.literal("SectionTextMultiImageSplit") }),
  ),
  SectionTextImageSplitSchema.merge(
    z.object({ __typename: z.literal("SectionTextImageSplit") }),
  ),
  SectionBucketGridSchema.merge(
    z.object({ __typename: z.literal("SectionBucketGrid") }),
  ),
  SectionStatBucketGridSchema.merge(
    z.object({ __typename: z.literal("SectionStatBucketGrid") }),
  ),
  SectionTextImageSchema.merge(
    z.object({ __typename: z.literal("SectionTextImage") }),
  ),
  SectionEventsResourcesSchema.merge(
    z.object({ __typename: z.literal("SectionEventsResources") }),
  ),
  SectionSocialMediaCtaSchema.merge(
    z.object({ __typename: z.literal("SectionSocialMediaCta") }),
  ),
  SectionNewsPressReleasesSchema.merge(
    z.object({ __typename: z.literal("SectionNewsPressReleases") }),
  ),
  SectionAboutSchema.merge(z.object({ __typename: z.literal("SectionAbout") })),
  SectionAccordionsSchema.merge(
    z.object({ __typename: z.literal("SectionAccordions") }),
  ),
])

export const LandingPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  headerOptions: z.string().nullable(),
  sectionsCollection: z.object({
    items: z.array(SectionsDiscriminatedUnion),
  }),
  seo: SEOSchema,
})

export type LandingPage = z.infer<typeof LandingPageSchema>

export async function getLandingPage(id: string) {
  const query = `query {
landingPage(id: "${id}") {
title
slug
headerOptions
sectionsCollection(limit: 9) {
    items {
        __typename
        ... on SectionHero {
            title
            mainContent { json }
            featuredImage { fileName url description width height }
        }
        ... on SectionHeroSplit {
            title
            mainContent { json }
            imageAlignment
            featuredImage { fileName url description width height }
        }
        ... on SectionTextMultiImageSplit {
            title
            mainContent { json }
            featuredImagesCollection {
                items { fileName url width height }
            }
        }
        ... on SectionTextImageSplit {
            title
            mainContent { json }
            imageAlignment
            imageShape
            featuredImage { fileName url description width height }
        }
        ... on SectionBucketGrid {
            title
            headline
            mainContent { json }
            bucketsCollection {
                items {
                    title
                    bucketText { json }
                    bucketImage { fileName url width height }
                }
            }
        }
        ... on SectionStatBucketGrid {
            title
            headline
            mainContent { json }
            statBucketsCollection {
                items {
                    title
                    headline
                    subheadline
                    bucketText { json }
                    bucketImage { fileName url width height }
                    link
                }
            }
        }
        ... on SectionTextImage {
            title
            mainContent { json }
            featuredImage { fileName url description width height }
        }
        ... on SectionEventsResources {
            title
            headlineEvents
            eventsCollection(limit: 3) {
                items {
                    title
                    slug
                    headline
                    datetime
                    location
                    excerpt { json }
                    mainContent { json }
                    seo {
                      title
                      excerpt
                      image { fileName url description width height }
                      keywords
                    }
                }
            }
            textEvents {
               json
            }
            headlineResources
            resourcesCollection(limit: 6) {
                items {
                    title
                    file { fileName url }
                }
            }
            featuredImage { fileName url description width height }
        }
        ... on SectionSocialMediaCta {
            title
            headline
            socialMediaLinksCollection {
                items { platform url }
            }
        }
        ... on SectionNewsPressReleases {
            title
            headline
            postsCollection(limit: 5) {
                items {
                    title
                    slug
                    date
                    headline
                    excerpt { json }
                    mainContent { json }
                    featuredImage { fileName url description width height }
                    seo {
                      title
                      excerpt
                      image { fileName url description width height }
                      keywords
                    }
                }
            }
        }
        ... on SectionAbout {
            title
            mainContent {
              json
              links {
                entries {
                   hyperlink {
                     sys { id }
                     __typename
                     ... on Page { slug }
                      ... on TeamPage { slug }
                      ... on CaseStudies { slug }
                      ... on AboutPage { slug }
                      ... on LandingPage { slug }
                      ... on Post { slug }
                   }
                }
                assets {
                  block { sys { id } url title width height description fileName contentType }
                  hyperlink { sys { id } url fileName }
                }
              }
            }
            featuredImage { fileName url description width height }
            imagesCollection {
              items { fileName url width height }
            }
        }
        ... on SectionAccordions {
            title
            headline
            mainContent { json }
            accordionItemsCollection {
              items {
                title
                headline
                mainContent { json }
              }
            }
        }
    }
}
seo {
  title
  excerpt
  image { fileName url description width height }
  keywords
}
}
}`

  const response = await typedFetchGraphQL<{ landingPage: LandingPage }>(query)

  if (!response.data) {
    console.error(`Error for Landing Page with id:${id}`, response.errors)

    return null
  }

  const landingPage = response.data.landingPage

  return validateWithSchema(LandingPageSchema, landingPage)
}

const LandingPageBySlugQuery = `query LandingPageBySlug($slug: String!) {
landingPageCollection(where: { slug: $slug }, limit: 1) {
items {
title
slug
headerOptions
sectionsCollection(limit: 9) {
    items {
        __typename
        ... on SectionHero {
            title
            mainContent { json }
            featuredImage { fileName url description width height }
        }
        ... on SectionHeroSplit {
            title
            mainContent { json }
            imageAlignment
            featuredImage { fileName url description width height }
        }
        ... on SectionTextMultiImageSplit {
            title
            mainContent { json }
            featuredImagesCollection {
                items { fileName url width height }
            }
        }
        ... on SectionTextImageSplit {
            title
            mainContent { json }
            imageAlignment
            imageShape
            featuredImage { fileName url description width height }
        }
        ... on SectionBucketGrid {
            title
            headline
            mainContent { json }
            bucketsCollection {
                items {
                    title
                    bucketText { json }
                    bucketImage { fileName url width height }
                }
            }
        }
        ... on SectionStatBucketGrid {
            title
            headline
            mainContent { json }
            statBucketsCollection {
                items {
                    title
                    headline
                    subheadline
                    bucketText { json }
                    bucketImage { fileName url width height }
                    link
                }
            }
        }
        ... on SectionTextImage {
            title
            mainContent { json }
            featuredImage { fileName url description width height }
        }
        ... on SectionEventsResources {
            title
            headlineEvents
            eventsCollection(limit: 3) {
                items {
                    title
                    slug
                    headline
                    datetime
                    location
                    excerpt { json }
                    mainContent { json }
                    seo {
                      title
                      excerpt
                      image { fileName url description width height }
                      keywords
                    }
                }
            }
            textEvents {
               json
            }
            headlineResources
            resourcesCollection(limit: 6) {
                items {
                    title
                    file { fileName url }
                }
            }
            featuredImage { fileName url description width height }
        }
        ... on SectionSocialMediaCta {
            title
            headline
            socialMediaLinksCollection {
                items { platform url }
            }
        }
        ... on SectionNewsPressReleases {
            title
            headline
            postsCollection(limit: 5) {
                items {
                    title
                    slug
                    date
                    headline
                    excerpt { json }
                    mainContent { json }
                    featuredImage { fileName url description width height }
                    seo {
                      title
                      excerpt
                      image { fileName url description width height }
                      keywords
                    }
                }
            }
        }
        ... on SectionAbout {
            title
            mainContent {
              json
              links {
                entries {
                   hyperlink {
                     sys { id }
                     __typename
                     ... on Page { slug }
                      ... on TeamPage { slug }
                      ... on CaseStudies { slug }
                      ... on AboutPage { slug }
                      ... on LandingPage { slug }
                      ... on Post { slug }
                   }
                }
                assets {
                  block { sys { id } url title width height description fileName contentType }
                  hyperlink { sys { id } url fileName }
                }
              }
            }
            featuredImage { fileName url description width height }
            imagesCollection {
              items { fileName url width height }
            }
        }
        ... on SectionAccordions {
            title
            headline
            mainContent { json }
            accordionItemsCollection {
              items {
                title
                headline
                mainContent { json }
              }
            }
        }
    }
}
seo {
    title
    excerpt
    image { fileName url description width height }
    keywords
}
}
}
}`

export async function getLandingPageBySlug(
  slug: string,
): Promise<LandingPage | null> {
  const response = await typedFetchGraphQL<{
    landingPageCollection: { items: Array<LandingPage> }
  }>(LandingPageBySlugQuery, { slug })

  if (!response.data) {
    console.error(`Error for Landing Page with slug:${slug}`, response.errors)

    return null
  }

  const landingPage = response.data.landingPageCollection.items[0]

  return validateWithSchema(LandingPageSchema, landingPage)
}
