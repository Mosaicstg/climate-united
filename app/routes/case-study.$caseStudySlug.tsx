import { useLoaderData, json, type MetaFunction } from "@remix-run/react"
import { getCaseStudies, getCaseStudyBySlug } from "~/models/case-study.server"
import { CaseStudy } from "~/ui/templates/CaseStudy"
import { invariantResponse } from "~/utils/invariant.server"
import { GeneralErrorBoundary } from "~/routes/$"
import { Show404 } from "~/ui/templates/404"
import type { RootLoader } from "~/root"
import { getSocialMetas } from "~/utils/seo"
import type { SEOHandle } from "@nasa-gcn/remix-seo"
import { Show500 } from "~/ui/templates/500"
import { z } from "zod"
import { serverOnly$ } from "vite-env-only"
import { type LoaderFunctionArgs } from "@netlify/remix-runtime"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { caseStudySlug } = params

  invariantResponse(caseStudySlug, "Page slug not found.", { status: 404 })

  try {
    const study = await getCaseStudyBySlug(caseStudySlug)

    invariantResponse(study, "Case Study not found.", { status: 404 })

    return json({ post: study })
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

export const handle: SEOHandle | undefined = serverOnly$({
  getSitemapEntries: async (request) => {
    const studies = await getCaseStudies(100)
    return studies.map((post) => ({
      route: `/case-study/${post.slug}`,
      priority: 0.7,
    }))
  },
})

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  data,
  matches,
  location,
}) => {
  const domainURL = matches.find((match) => match.id === "root")?.data.domainURL
  const { pathname } = location

  return [
    ...(data
      ? [
          ...getSocialMetas({
            title: `${data.post.seo?.title ? data.post.seo.title : data.post.title} - Case Studies - Climate United`,
            url: `${domainURL}${pathname}`,
            image: `${data.post.seo?.image.url ? data.post.seo.image.url : ""}`,
            description: `${data.post.seo?.excerpt ? data.post.seo?.excerpt : ""}`,
            keywords: `${data.post.seo?.keywords ? data.post.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function Study() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <CaseStudy
      title={post.title}
      slug={post.slug}
      partnerLogo={post.partnerLogo}
      headline={post.headline}
      category={post.category}
      location={post.location}
      description={post.description}
      mainImage={post.mainImage}
      video={post.video}
      mainContent={post.mainContent}
      ctaText={post.ctaText}
      ctaUrl={post.ctaUrl}
      seo={post.seo}
    />
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <Show404 />,
        500: () => <Show500 />,
      }}
    />
  )
}
