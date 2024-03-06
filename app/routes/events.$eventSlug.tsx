import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getEventBySlug, EventSchema, getEvents } from "~/models/event.server"
import { Event } from "~/ui/templates/Event"
import { invariantResponse } from "~/utils/invariant.server"
import { GeneralErrorBoundary } from "~/routes/$"
import { Show404 } from "~/ui/templates/404"
import { getSocialMetas } from "~/utils/seo"
import type { RootLoader } from "~/root"
import type { SEOHandle } from "@nasa-gcn/remix-seo"
import { Show500 } from "~/ui/templates/500"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { eventSlug } = params

  invariantResponse(eventSlug, "Event slug not found.", { status: 404 })

  const event = await getEventBySlug(eventSlug)
  const response = EventSchema.safeParse(event)

  invariantResponse(response.success, "Event not found.", { status: 404 })

  return json({ event: response.data })
}

export const handle: SEOHandle | undefined = {
  getSitemapEntries: async (request) => {
    const eventsData = await getEvents(100)

    return eventsData.map((event) => ({
      route: `/events/${event.slug}`,
      priority: 0.7,
    }))
  },
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
            title: `${data.event.seo?.title} - Events - Climate United`,
            url: `${domainURL}${pathname}`,
            description: `${data.event.seo.excerpt}`,
            image: `${data.event.seo.image.url}`,
            keywords: `${data.event.seo?.keywords ? data.event.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function SingleEvent() {
  const { event } = useLoaderData<typeof loader>()

  return (
    <Event
      title={event.title}
      slug={event.slug}
      headline={event.headline}
      datetime={event.datetime}
      location={event.location}
      mainContent={event.mainContent}
      seo={event.seo}
    />
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <Show404 />,
        500: () => <Show500 />,
      }}
    />
  )
}
