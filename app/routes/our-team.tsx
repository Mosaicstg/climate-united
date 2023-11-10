import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { invariantResponse } from "~/utils/invariant.server"
import { getTeamPage } from "~/models/team.server"

export const loader = async () => {
  // TODO: Title of page in Contentful should match the route `Meet The Team`
  const teamPage = await getTeamPage("r4OYblQ1BKEvh8k7RHp09")

  invariantResponse(teamPage, "Meet The Team page not found.", { status: 404 })

  return json({ teamPage })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...(data ? [{ title: `${data.teamPage.title} - Climate United` }] : []),
  ]
}

export default function AboutTheGreenhouseGasReductionFund() {
  const { teamPage } = useLoaderData<typeof loader>()

  return <div>Hello From the Meet The Team page</div>
}
