import { typedFetchGraphQL } from "~/services/contentful.server"
import { z } from "zod"
import { SectionHeroSchema } from "~/schemas/sections/section.hero.server"
import { SectionTextMultiImageSplitSchema } from "~/schemas/sections/section.text-multi-image-split.server"
import { SectionBucketGridSchema } from "~/schemas/sections/section.bucket-grid.server"
import { SectionTextImageSchema } from "~/schemas/sections/section.text-image.server"
import { SectionEventsResourcesSchema } from "~/schemas/sections/section.events-resources.server"
import { SectionTextImageSplitSchema } from "~/schemas/sections/section.text-image-split.server"
import { SectionNewsPressReleasesSchema } from "~/schemas/sections/section.news-press-releases.server"
import { SectionSocialMediaCtaSchema } from "~/schemas/sections/section.social-media-cta.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { SEOSchema } from "./seo.server"

const SectionsDiscriminatedUnion = z.discriminatedUnion("__typename", [
  SectionHeroSchema.merge(
    z.object({
      __typename: z.literal("SectionHero"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionTextMultiImageSplitSchema.merge(
    z.object({
      __typename: z.literal("SectionTextMultiImageSplit"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionTextImageSplitSchema.merge(
    z.object({
      __typename: z.literal("SectionTextImageSplit"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionBucketGridSchema.merge(
    z.object({
      __typename: z.literal("SectionBucketGrid"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionTextImageSchema.merge(
    z.object({
      __typename: z.literal("SectionTextImage"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionEventsResourcesSchema.merge(
    z.object({
      __typename: z.literal("SectionEventsResources"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionSocialMediaCtaSchema.merge(
    z.object({
      __typename: z.literal("SectionSocialMediaCta"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
  SectionNewsPressReleasesSchema.merge(
    z.object({
      __typename: z.literal("SectionNewsPressReleases"),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
])

export const LandingPageSchema = z.object({
  __typename: z.literal("LandingPage"),
  title: z.string(),
  sys: z.object({
    id: z.string(),
  }),
  slug: z.string(),
  sectionsCollection: z.object({
    items: z.array(SectionsDiscriminatedUnion),
  }),
  seo: SEOSchema,
})

export type LandingPage = z.infer<typeof LandingPageSchema>

export async function getLandingPage(id: string) {
  const query = `
query LandingPageById($id: String!) {
  landingPage(id: $id) {
    __typename
    title
    sys {
      id
    }
    slug
    sectionsCollection {
      items {
        __typename
        ... on SectionHero {
          title
          sys {
            id
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
        ... on SectionTextMultiImageSplit {
          title
          sys {
            id
          }
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
          sys {
            id
          }
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
          sys {
            id
          }
          headline
          mainContent {
            json
          }
          bucketsCollection {
            items {
              title
              sys {
                id
              }
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
          sys {
            id
          }
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
          sys {
            id
          }
          headlineEvents
          eventsCollection(limit: 3) {
            items {
              title
              sys {
                id
              }
              slug
              headline
              datetime
              location
              excerpt {
                json
              }
              mainContent {
                json
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
          textEvents {
            json
          }
          headlineResources
          resourcesCollection(limit: 6) {
            items {
              title
              sys {
                id
              }
              file {
                sys {
                  id
                }
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
        ... on SectionSocialMediaCta {
          title
          sys {
            id
          }
          headline
          socialMediaLinksCollection {
            items {
              sys {
                id
              }
              platform
              url
            }
          }
        }
        ... on SectionNewsPressReleases {
          title
          sys {
            id
          }
          headline
          postsCollection(limit: 5) {
            items {
              sys {
                id
              }
              title
              slug
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
      keywords
    }
  }
}`

  const response = await typedFetchGraphQL<{ landingPage: LandingPage }>(
    query,
    { id },
    false,
  )

  if (!response.data) {
    console.error(`Error for Landing Page with id:${id}`, response.errors)

    return null
  }

  const landingPage = response.data.landingPage

  return validateWithSchema(LandingPageSchema, landingPage)
}

const LandingPageBySlugQuery = `
query LandingPageBySlug($slug: String!, $preview: Boolean = false) {
  landingPageCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
    items {
      __typename
      title
      sys {
        id
      }
      slug
      sectionsCollection {
        items {
          __typename
          ... on SectionHero {
            title
            sys {
              id
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
          ... on SectionTextMultiImageSplit {
            title
            sys {
              id
            }
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
            sys {
              id
            }
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
            sys {
              id
            }
            headline
            mainContent {
              json
            }
            bucketsCollection {
              items {
                sys {
                  id
                }
                title
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
            sys {
              id
            }
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
            sys {
              id
            }
            headlineEvents
            eventsCollection(limit: 3) {
              items {
                title
                sys {
                  id
                }
                slug
                headline
                datetime
                location
                excerpt {
                  json
                }
                mainContent {
                  json
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
            textEvents {
              json
            }
            headlineResources
            resourcesCollection(limit: 6) {
              items {
                sys {
                  id
                }
                title
                file {
                  sys {
                    id
                  }
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
          ... on SectionSocialMediaCta {
            title
            sys {
              id
            }
            headline
            socialMediaLinksCollection {
              items {
                sys {
                  id
                }
                platform
                url
              }
            }
          }
          ... on SectionNewsPressReleases {
            title
            sys {
              id
            }
            headline
            postsCollection(limit: 5) {
              items {
                title
                sys {
                  id
                }
                slug
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
        keywords
      }
    }
  }
}`

export async function getLandingPageBySlug(
  slug: string,
  preview: boolean = false,
): Promise<LandingPage | null> {
  const response = await typedFetchGraphQL<{
    landingPageCollection: { items: Array<LandingPage> }
  }>(LandingPageBySlugQuery, { slug, preview }, preview)

  if (!response.data) {
    console.error(`Error for Landing Page with slug:${slug}`, response.errors)

    return null
  }

  const landingPage = response.data.landingPageCollection.items[0]

  return validateWithSchema(LandingPageSchema, landingPage)
}
