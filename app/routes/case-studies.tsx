import { type MetaFunction, useLoaderData, json } from "@remix-run/react"
import { type RootLoader } from "~/root"
import { invariantResponse } from "~/utils/invariant.server"
import { getSocialMetas } from "~/utils/seo"
import { getCaseStudiesPage } from "~/models/case-studies.server"
import { CaseStudiesPage } from "~/ui/templates/CaseStudiesPage"
import { getEPARegionsWithCaseStudies } from "~/models/epa-region.server"
import { z } from "zod"
import { type LoaderFunctionArgs } from "@netlify/remix-runtime"

export const loader = async (_: LoaderFunctionArgs) => {
  try {
    const caseStudiesPage = await getCaseStudiesPage("5dyemzvjKm8r9UQ71CPua7")

    invariantResponse(caseStudiesPage, "Case Studies page not found.", {
      status: 404,
    })

    const epaRegionsWithCaseStudies = await getEPARegionsWithCaseStudies()

    return json({
      page: caseStudiesPage,
      epaRegionsWithCaseStudies,
    } as const)
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
            title: `${data.page.seo?.title} - Climate United`,
            url: `${domainURL}${pathname}`,
            description: `${data.page.seo.excerpt}`,
            image: `${data.page.seo.image.url}`,
            keywords: `${data.page.seo?.keywords ? data.page.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function CaseStudies() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <CaseStudiesPage
      title={page.title}
      headline={page.headline}
      mainContent={page.mainContent}
      featuredImage={page.featuredImage}
      seo={page.seo}
    />
  )
}
