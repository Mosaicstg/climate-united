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
import { AboutPage } from "~/ui/templates/AboutPage"
import { CaseStudiesPage } from "~/ui/templates/CaseStudiesPage"
import { LandingPage } from "~/ui/templates/LandingPage"
import { Page } from "~/ui/templates/Page"
import { TeamPage } from "~/ui/templates/TeamPage"
import { invariantResponse } from "~/utils/invariant.server"
import { findContentBySlug, getAllPublishedPages } from "./lib.server"
import { getSocialMetas } from "~/utils/seo"
import { type RootLoader } from "~/root"
import { serverOnly$ } from "vite-env-only"
import { isPreviewMode } from "~/lib/preview-cookie.server"

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { slug } = params

  invariantResponse(slug, "Page slug not found.", { status: 404 })

  const foundSlash = slug.indexOf("/") === 0

  invariantResponse(!foundSlash, "Page slug not found.", { status: 404 })

  const isInPreviewMode = await isPreviewMode(request)

  const content = await findContentBySlug(slug, isInPreviewMode)

  invariantResponse(content, "Content not found.", { status: 404 })

  try {
    switch (content.__typename) {
      case "Page":
        const page = await getPageBySlug(slug)

        invariantResponse(page, "Page not found", { status: 404 })

        return json({
          page,
          __typename: content.__typename,
          isInPreviewMode,
        } as const)
      case "TeamPage":
        const teamPage = await getTeamPageBySlug(slug)

        invariantResponse(teamPage, "Team page not found", { status: 404 })

        return json({ teamPage, __typename: content.__typename } as const)
      case "CaseStudies":
        const caseStudiesPage = await getCaseStudiesPageBySlug(slug)

        invariantResponse(caseStudiesPage, "Case studies page not found", {
          status: 404,
        })

        const epaRegionsWithCaseStudies = await getEPARegionsWithCaseStudies()

        return json({
          caseStudiesPage,
          epaRegionsWithCaseStudies,
          __typename: content.__typename,
        } as const)
      case "AboutPage":
        const aboutPage = await getAboutPageBySlug(slug)

        invariantResponse(aboutPage, "About page not found", { status: 404 })

        return json({
          aboutPage,
          __typename: content.__typename,
        } as const)
      case "LandingPage":
        const landingPage = await getLandingPageBySlug(slug, isInPreviewMode)

        invariantResponse(landingPage, "Landing page not found", {
          status: 404,
        })

        const regions = await getEPARegions()

        return json({
          landingPage,
          regions,
          __typename: content.__typename,
          isInPreviewMode,
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

export const handle: SEOHandle | undefined = serverOnly$({
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
})

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  data,
  matches,
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
