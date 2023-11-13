import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import { getEventBySlug, EventSchema } from "~/models/event.server"
import { Event } from "~/ui/templates/Event"
import { invariantResponse } from "~/utils/invariant.server"
import { GeneralErrorBoundary } from "~/routes/$"
import { Show404 } from "~/ui/templates/404"

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="text-primary underline dark:text-gray-400"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return (
        <p className="mb-4 text-base leading-relaxed text-black">{children}</p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl dark:text-gray-200">{children}</h2>
    },
  },
}

export const loader = async ({ params }: DataFunctionArgs) => {
  const { eventSlug } = params

  invariantResponse(eventSlug, "Event slug not found.", { status: 404 })

  const event = await getEventBySlug(eventSlug)
  const response = EventSchema.safeParse(event)

  invariantResponse(response.success, "Event not found.", { status: 404 })

  return json({ event: response.data })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...(data
      ? [
          { title: `${data.event.title} - Events - Climate United` },
          {
            name: "description",
            content: `${data.event.seo.excerpt}`,
          },
          {
            property: "og:image",
            content: `${data.event.seo.image.url}`,
          },
        ]
      : []),
  ]
}

export default function SingleEvent() {
  const { event } = useLoaderData<typeof loader>()

  console.log(event)

  return (
    <Event
      title={event.title}
      headline={event.headline}
      datetime={event.datetime}
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
      }}
    />
  )
}
