import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { type RootLoader } from "~/root"
import { invariantResponse } from "~/utils/invariant.server"
import { getSocialMetas } from "~/utils/seo"
import { getCaseStudiesPage } from "~/models/case-studies.server"
import { CaseStudiesPage } from "~/ui/templates/CaseStudiesPage"
import { getEPARegionsWithCaseStudies } from "~/models/epa-region.server"

export const loader = async (_: LoaderFunctionArgs) => {
  const caseStudiesPage = await getCaseStudiesPage("4d7g9VYoTaIuUCuVEJu4U2")

  invariantResponse(caseStudiesPage, "Case Studies page not found.", {
    status: 404,
  })

  const epaRegionsWithCaseStudies = await getEPARegionsWithCaseStudies()

  return json({
    page: caseStudiesPage,
    epaRegionsWithCaseStudies,
  } as const)
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
