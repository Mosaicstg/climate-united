import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getLandingPage } from "~/models/landing-page.server"
import { invariantResponse } from "~/utils/invariant.server"
import { LandingPage } from "~/ui/templates/LandingPage"
import { getSocialMetas } from "~/utils/seo"
import { type RootLoader } from "~/root"
import { getEPARegions } from "~/models/epa-region.server"

export const loader = async () => {
  const landingPage = await getLandingPage("2OVuAnTbko7I7V8nzbBR8K")

  invariantResponse(landingPage, "Homepage not found.", { status: 404 })

  const regions = await getEPARegions()

  return json({ landingPage, regions } as const)
}

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  data,
  matches,
}) => {
  const domainURL = matches.find((match) => match.id === "root")?.data
    ?.domainURL

  return [
    ...(data
      ? [
          ...getSocialMetas({
            type: "website",
            title: `${data.landingPage.seo?.title}`,
            image: data.landingPage.seo.image.url,
            description: data.landingPage.seo.excerpt,
            url: `${domainURL}`,
            keywords: `${
              data.landingPage.seo?.keywords
                ? data.landingPage.seo.keywords
                : ""
            }`,
          }),
        ]
      : []),
  ]
}

export default function _index() {
  const { landingPage } = useLoaderData<typeof loader>()

  return <LandingPage {...landingPage} />
}
