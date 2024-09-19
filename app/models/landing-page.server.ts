import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { SectionHeroSchema } from "~/schemas/sections/section.hero.server"
import { SectionHeroSplitSchema } from "~/schemas/sections/section.hero-split.server"
import { SectionStatBucketGridSchema } from "~/schemas/sections/section.stat-bucket-grid.server"
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
  SectionTextImageSplitSchema.merge(
    z.object({ __typename: z.literal("SectionTextImageSplit") }),
  ),
  SectionStatBucketGridSchema.merge(
    z.object({ __typename: z.literal("SectionStatBucketGrid") }),
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
sectionsCollection(where: { sys: { publishedVersion_exists: true } }, limit: 9) {
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
        ... on SectionTextImageSplit {
            title
            mainContent { json }
            buttonsCollection(where: { sys: { publishedVersion_exists: true } }) {
              items {
                title
                text,
                referenceLink {
                  __typename
                  ... on AboutPage {
                    slug
                  }
                  ... on Event {
                    slug
                  }
                  ... on LandingPage {
                    slug
                  }
                  ... on Page {
                    slug
                  }
                  ... on Post {
                    slug
                  }
                  ... on TeamMember {
                    slug
                  }
                  ... on TeamPage {
                    slug
                  }
                }
                externalLink
              }
            }
            imageAlignment
            imageShape
            featuredImage { fileName url description width height }
        }
        ... on SectionStatBucketGrid {
            title
            headline
            mainContent { json }
            statBucketsCollection(where: { sys: { publishedVersion_exists: true } }) {
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
        ... on SectionSocialMediaCta {
            title
            headline
            socialMediaLinksCollection(where: { sys: { publishedVersion_exists: true } }) {
                items { platform url }
            }
        }
        ... on SectionNewsPressReleases {
            title
            headline
            postsCollection(where: { sys: { publishedVersion_exists: true } }, limit: 5) {
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
            accordionItemsCollection(where: { sys: { publishedVersion_exists: true } }) {
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
sectionsCollection(where: { sys: { publishedVersion_exists: true } }, limit: 9) {
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
        ... on SectionTextImageSplit {
            title
            mainContent { json }
            buttonsCollection(where: { sys: { publishedVersion_exists: true } }) {
              items {
                title
                text,
                referenceLink {
                  __typename
                  ... on AboutPage {
                    slug
                  }
                  ... on Event {
                    slug
                  }
                  ... on LandingPage {
                    slug
                  }
                  ... on Page {
                    slug
                  }
                  ... on Post {
                    slug
                  }
                  ... on TeamMember {
                    slug
                  }
                  ... on TeamPage {
                    slug
                  }
                }
                externalLink
              }
            }
            imageAlignment
            imageShape
            featuredImage { fileName url description width height }
        }
        ... on SectionStatBucketGrid {
            title
            headline
            mainContent { json }
            statBucketsCollection(where: { sys: { publishedVersion_exists: true } }) {
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
        ... on SectionSocialMediaCta {
            title
            headline
            socialMediaLinksCollection(where: { sys: { publishedVersion_exists: true } }) {
                items { platform url }
            }
        }
        ... on SectionNewsPressReleases {
            title
            headline
            postsCollection(where: { sys: { publishedVersion_exists: true } }, limit: 5) {
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
            accordionItemsCollection(where: { sys: { publishedVersion_exists: true } }) {
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
