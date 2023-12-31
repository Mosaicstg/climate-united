import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getLandingPage } from "~/models/landing-page.server"
import { invariantResponse } from "~/utils/invariant.server"
import { LandingPage } from "~/ui/templates/LandingPage"
import { getSocialMetas } from "~/utils/seo"
import { type RootLoader } from "~/root"

export const loader = async () => {
  const landingPage = await getLandingPage("2OVuAnTbko7I7V8nzbBR8K")

  invariantResponse(landingPage, "Homepage not found.", { status: 404 })

  return json({ landingPage })
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
            title: `${data.landingPage.title} - Climate United`,
            image: data.landingPage.seo.image.url,
            description: data.landingPage.seo.excerpt,
            url: `${domainURL}`,
          }),
        ]
      : []),
  ]
}

export default function _index() {
  const { landingPage } = useLoaderData<typeof loader>()

  return (
    <LandingPage
      title={landingPage.title}
      sectionsCollection={landingPage.sectionsCollection}
      seo={landingPage.seo}
    />
  )
}
