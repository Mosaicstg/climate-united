import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getAboutPage } from "~/models/about.server"
import { invariantResponse } from "~/utils/invariant.server"

export const loader = async () => {
  // TODO: Title of page in Contentful should match the route `About`
  const aboutPage = await getAboutPage("6wHRbfqkflPjD7tVNmz4C")

  invariantResponse(aboutPage, "About page not found.", { status: 404 })

  return json({ aboutPage })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...(data ? [{ title: `${data.aboutPage.title} - Climate United` }] : []),
  ]
}

export default function AboutTheGreenhouseGasReductionFund() {
  const { aboutPage } = useLoaderData<typeof loader>()

  return <div>Hello From the About page</div>
}
