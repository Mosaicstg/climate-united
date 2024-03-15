import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { getPageBySlug } from "~/models/page.server"
import { invariantResponse } from "~/utils/invariant.server"
import { type RootLoader } from "~/root"
import { getSocialMetas } from "~/utils/seo"
import { useLoaderData } from "@remix-run/react"
import { Page } from "~/ui/templates/Page"

export const loader = async (_: LoaderFunctionArgs) => {
  const worthWithUsPage = await getPageBySlug("work-with-us")

  invariantResponse(worthWithUsPage, "Page not found", { status: 404 })

  return json({
    page: worthWithUsPage,
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
            image: `${data.page.seo.image.url}`,
            description: `${data.page.seo.excerpt}`,
            keywords: `${data.page.seo?.keywords ? data.page.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function WorkWithUs() {
  const { page } = useLoaderData<typeof loader>()

  return <Page {...page} />
}
