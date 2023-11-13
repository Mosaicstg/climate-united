import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getLandingPage } from "~/models/landing-page.server"
import { invariantResponse } from "~/utils/invariant.server"
import { LandingPage } from "~/ui/templates/LandingPage"

export const loader = async () => {
  const landingPage = await getLandingPage("2OVuAnTbko7I7V8nzbBR8K")

  invariantResponse(landingPage, "Homepage not found.", { status: 404 })

  return json({ landingPage })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...(data
      ? [
          { title: `${data.landingPage.title} - Climate United` },
          {
            name: "description",
            content: `${data.landingPage.seo.excerpt}`,
          },
          {
            property: "og:image",
            content: `${data.landingPage.seo.image.url}`,
          },
        ]
      : []),
  ]
}

export default function _index() {
  const { landingPage } = useLoaderData<typeof loader>()

  console.log(landingPage)

  return (
    <LandingPage
      title={landingPage.title}
      sectionsCollection={landingPage.sectionsCollection}
      seo={landingPage.seo}
    />
  )
}
