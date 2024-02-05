import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getAboutPage } from "~/models/about.server"
import { invariantResponse } from "~/utils/invariant.server"
import { AboutPage } from "~/ui/templates/AboutPage"
import type { RootLoader } from "~/root"
import { getSocialMetas } from "~/utils/seo"

export const loader = async () => {
  const aboutPage = await getAboutPage("6wHRbfqkflPjD7tVNmz4C")

  invariantResponse(aboutPage, "About page not found.", { status: 404 })

  return json({ aboutPage })
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
          url: `${domainURL}${pathname}`,
          title: `${data.aboutPage.seo?.title} - Climate United`,
          description: data.aboutPage.seo.excerpt,
          image: data.aboutPage.seo.image.url,
          keywords: `${data.aboutPage.seo?.keywords ? data.aboutPage.seo.keywords : ""}`,
        }),
      ]
      : []),
  ]
}

export default function AboutClimateUnited() {
  const { aboutPage } = useLoaderData<typeof loader>()

  return (
    <AboutPage
      title={aboutPage.title}
      featuredImage={aboutPage.featuredImage}
      sectionsCollection={aboutPage.sectionsCollection}
      caseStudiesHeadline={aboutPage.caseStudiesHeadline}
      caseStudiesCollection={aboutPage.caseStudiesCollection}
      seo={aboutPage.seo}
    />
  )
}
