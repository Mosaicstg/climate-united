import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { z } from "zod"
import { getAboutPageBySlug } from "~/models/about.server"
import { getCaseStudiesPageBySlug } from "~/models/case-studies.server"
import { getEPARegions } from "~/models/epa-region.server"
import { getLandingPageBySlug } from "~/models/landing-page.server"
import { getPageBySlug } from "~/models/page.server"
import { getTeamPageBySlug } from "~/models/team.server"
import { typedFetchGraphQL } from "~/services/contentful.server"
import { AboutPage } from "~/ui/templates/AboutPage"
import { CaseStudiesPage } from "~/ui/templates/CaseStudiesPage"
import { LandingPage } from "~/ui/templates/LandingPage"
import { Page } from "~/ui/templates/Page"
import { TeamPage } from "~/ui/templates/TeamPage"
import { invariantResponse } from "~/utils/invariant.server"

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

        return json({
          caseStudiesPage,
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

    throw new Response("Something went wrong!", { status: 500 })
  }
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
