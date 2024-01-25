import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { invariantResponse } from "~/utils/invariant.server"
import { getTeamPage } from "~/models/team.server"
import { TeamPage } from "~/ui/templates/TeamPage"
import { getSocialMetas } from "~/utils/seo"
import { type RootLoader } from "~/root"

export const loader = async () => {
  const teamPage = await getTeamPage("r4OYblQ1BKEvh8k7RHp09")

  invariantResponse(teamPage, "Our Team page not found.", { status: 404 })

  return json({ teamPage })
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
          title: `${data.teamPage.title} - Climate United`,
          image: data.teamPage.seo.image.url,
          description: data.teamPage.seo.excerpt,
          keywords: `${data.teamPage.seo?.keywords ? data.teamPage.seo.keywords : ''}`
        }),
      ]
      : []),
  ]
}

export default function OurTeam() {
  const { teamPage } = useLoaderData<typeof loader>()

  return (
    <TeamPage
      title={teamPage.title}
      headline={teamPage.headline}
      featuredImage={teamPage.featuredImage}
      sectionsCollection={teamPage.sectionsCollection}
      seo={teamPage.seo}
    />
  )
}
