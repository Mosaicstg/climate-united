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
}) => {
  const domainURL = matches.find((match) => match.id === "root")?.data.domainURL
  return [
    ...(data
      ? [
          ...getSocialMetas({
            url: `${domainURL}/our-team`,
            title: `${data.teamPage.title} - Climate United`,
            image: data.teamPage.seo.image.url,
            description: data.teamPage.seo.excerpt,
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
