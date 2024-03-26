import { type SEOHandle } from "@nasa-gcn/remix-seo"
import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { z } from "zod"
import {
  type AboutPage as AboutPageModel,
  getAboutPageBySlug,
} from "~/models/about.server"
import {
  type CaseStudies as CaseStudiesModel,
  getCaseStudiesPageBySlug,
} from "~/models/case-studies.server"
import {
  getEPARegions,
  getEPARegionsWithCaseStudies,
} from "~/models/epa-region.server"
import {
  type LandingPage as LandingPageModel,
  getLandingPageBySlug,
} from "~/models/landing-page.server"
import { type Page as PageModel, getPageBySlug } from "~/models/page.server"
import {
  type TeamPage as TeamPageModel,
  getTeamPageBySlug,
} from "~/models/team.server"
import { type RootLoader } from "~/root"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { AboutPage } from "~/ui/templates/AboutPage"
import { CaseStudiesPage } from "~/ui/templates/CaseStudiesPage"
import { LandingPage } from "~/ui/templates/LandingPage"
import { Page } from "~/ui/templates/Page"
import { TeamPage } from "~/ui/templates/TeamPage"
import { invariantResponse } from "~/utils/invariant.server"
import { getSocialMetas } from "~/utils/seo"

// This query tries to find a page that doesn't have a designated route
// This is for basic Page, TeamPage, CaseStudies, etc.
const FindBySlugQuery = `
    query FindBySlug($slug: String!) {
        pageCollection(where: {slug: $slug}, limit: 1) {
            items {
                slug
                __typename
            }
        }
        teamPageCollection(where: {slug: $slug}, limit: 1) {
            items {
                slug
                __typename
            }
        }
        caseStudiesCollection(where: {slug: $slug}, limit: 1) {
            items {
                slug
                __typename
            }
        }
        aboutPageCollection(where: {slug: $slug}, limit: 1) {
            items {
                slug
                __typename
            }
        }
        landingPageCollection(where: {slug: $slug}, limit: 1) {
            items {
                slug
                __typename
            }
        }
    }
`

const getAllPublishedPagesQuery = `
    query GetAllPublishedPages($limit: Int!) {
        pageCollection(limit: $limit) {
            items {
                slug
            }
        }
        teamPageCollection(limit: $limit) {
            items {
                slug
            }
        }
        caseStudiesCollection(limit: $limit) {
            items {
                slug
            }
        }
        aboutPageCollection(limit: $limit) {
            items {
                slug
            }
        }
        landingPageCollection(limit: $limit) {
            items {
                slug
            }
        }
    }
`

async function getAllPublishedPages(limit: number = 100) {
  const response = await typedFetchGraphQL<{
    pageCollection: { items: { slug: string }[] }
    teamPageCollection: { items: { slug: string }[] }
    caseStudiesCollection: { items: { slug: string }[] }
    aboutPageCollection: { items: { slug: string }[] }
    landingPageCollection: { items: { slug: string }[] }
  }>(getAllPublishedPagesQuery, { limit })

  if (!response.data) {
    console.error(`Error for all published pages`, response.errors)

    return []
  }

  return [
    ...response.data.pageCollection.items,
    ...response.data.teamPageCollection.items,
    ...response.data.caseStudiesCollection.items,
    ...response.data.aboutPageCollection.items,
    ...response.data.landingPageCollection.items,
  ]
}

async function findContentBySlug(
  slug: string,
): Promise<{ __typename: string; slug: string } | null> {
  const response = await typedFetchGraphQL<{
    pageCollection: {
      items: {
        slug: string
        __typename: string
      }[]
    }
    teamPageCollection: {
      items: {
        slug: string
        __typename: string
      }[]
    }
    caseStudiesCollection: {
      items: {
        slug: string
        __typename: string
      }[]
    }
    aboutPageCollection: {
      items: {
        slug: string
        __typename: string
      }[]
    }
    landingPageCollection: {
      items: {
        slug: string
        __typename: string
      }[]
    }
  }>(FindBySlugQuery, { slug })

  if (!response.data) {
    console.error(`Error for page with slug: ${slug}`, response.errors)

    return null
  }

  const page = response.data.pageCollection.items[0]
  const teamPage = response.data.teamPageCollection.items[0]
  const caseStudiesPage = response.data.caseStudiesCollection.items[0]
  const aboutPage = response.data.aboutPageCollection.items[0]
  const landingPage = response.data.landingPageCollection.items[0]

  if (page) {
    return page
  }

  if (teamPage) {
    return teamPage
  }

  if (caseStudiesPage) {
    return caseStudiesPage
  }

  if (aboutPage) {
    return aboutPage
  }

  if (landingPage) {
    return landingPage
  }

  return null
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params

  invariantResponse(slug, "Page slug not found.", { status: 404 })

  const foundSlash = slug.indexOf("/") === 0

  invariantResponse(!foundSlash, "Page slug not found.", { status: 404 })

  const contentType = await findContentBySlug(slug)

  invariantResponse(contentType, "Content not found.", { status: 404 })

  try {
    switch (contentType.__typename) {
      case "Page":
        const page = await getPageBySlug(slug)

        invariantResponse(page, "Page not found", { status: 404 })

        return json({ page, __typename: contentType.__typename } as const)
      case "TeamPage":
        const teamPage = await getTeamPageBySlug(slug)

        invariantResponse(teamPage, "Team page not found", { status: 404 })

        return json({ teamPage, __typename: contentType.__typename } as const)
      case "CaseStudies":
        const caseStudiesPage = await getCaseStudiesPageBySlug(slug)

        invariantResponse(caseStudiesPage, "Case studies page not found", {
          status: 404,
        })

        const epaRegionsWithCaseStudies = await getEPARegionsWithCaseStudies()

        return json({
          caseStudiesPage,
          epaRegionsWithCaseStudies,
          __typename: contentType.__typename,
        } as const)
      case "AboutPage":
        const aboutPage = await getAboutPageBySlug(slug)

        invariantResponse(aboutPage, "About page not found", { status: 404 })

        return json({
          aboutPage,
          __typename: contentType.__typename,
        } as const)
      case "LandingPage":
        const landingPage = await getLandingPageBySlug(slug)

        invariantResponse(landingPage, "Landing page not found", {
          status: 404,
        })

        const regions = await getEPARegions()

        return json({
          landingPage,
          regions,
          __typename: contentType.__typename,
        } as const)
      default:
        // Just throw an error if we can't find the page
        invariantResponse(false, "Page not found", { status: 404 })
    }
  } catch (error) {
    // Log this on the server
    console.error(error)

    if (error instanceof Response) {
      const message = await error.text()

      throw new Response(message, { status: 404 })
    }

    if (error instanceof z.ZodError) {
      const errors = error.issues.map((error) => error.message)
      const errorMessage = errors.join(", ")

      throw new Response(errorMessage, { status: 404 })
    }

    throw new Response("Something went wrong!", { status: 404 })
  }
}

export const handle: SEOHandle | undefined = {
  getSitemapEntries: async (request) => {
    const pages = await getAllPublishedPages(100)

    return pages
      .filter((post) => post.slug)
      .filter((post) => post.slug !== "homepage")
      .map((post) => ({
        route: `/${post.slug}`,
        priority: 0.7,
      }))
  },
}

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  data,
  matches,
  params,
}) => {
  const domainURL = matches.find((match) => match.id === "root")?.data
    ?.domainURL

  if (!data) {
    return []
  }

  let content:
    | PageModel
    | TeamPageModel
    | CaseStudiesModel
    | AboutPageModel
    | LandingPageModel
    | undefined

  switch (data.__typename) {
    case "Page":
      content = data.page
      break
    case "TeamPage":
      content = data.teamPage
      break
    case "CaseStudies":
      content = data.caseStudiesPage
      break
    case "AboutPage":
      content = data.aboutPage
      break
    case "LandingPage":
      content = data.landingPage
      break
    default:
      return []
  }

  return [
    ...getSocialMetas({
      type: "website",
      title: `${content.seo?.title}`,
      image: content.seo.image.url,
      description: content.seo.excerpt,
      url: `${domainURL}/${content.slug}`,
      keywords: `${content.seo?.keywords ? content.seo.keywords : ""}`,
    }),
  ]
}

export default function Slug() {
  const data = useLoaderData<typeof loader>()

  switch (data.__typename) {
    case "Page":
      return <Page {...data.page} />
    case "TeamPage":
      return <TeamPage {...data.teamPage} />
    case "CaseStudies":
      return <CaseStudiesPage {...data.caseStudiesPage} />
    case "AboutPage":
      return <AboutPage {...data.aboutPage} />
    case "LandingPage":
      return <LandingPage {...data.landingPage} />
    default:
      return null
  }
}
