import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { getPage } from "~/models/page.server"
import { type RootLoader } from "~/root"
import { Page } from "~/ui/templates/Page"
import { invariantResponse } from "~/utils/invariant.server"
import { getSocialMetas } from "~/utils/seo"

export const loader = async (_: LoaderFunctionArgs) => {
  const page = await getPage("1ydvGd1x8TYHNWeNUbqFeC")

  invariantResponse(page, "About page not found.", { status: 404 })

  return json({ page: page })
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

export default function AboutTheGreenhouseGasReductionFund() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <Page
      title={page.title}
      headline={page.headline}
      featuredImage={page.featuredImage}
      mainContent={page.mainContent}
      seo={page.seo}
    />
  )
}
