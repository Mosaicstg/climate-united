import { useContentfulInspectorMode } from "@contentful/live-preview/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type Event } from "~/models/event.server"
import { getDateWithTime } from "~/utils/datetime-to-readable"

type EventProps = Event

export function Event({
  slug,
  headline,
  datetime,
  location,
  excerpt,
  sys,
}: EventProps) {
  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <div className="mt-5">
      <h3
        className="mb-2 text-xl font-bold"
        {...inspectorProps({ fieldId: "headline" })}
      >
        <a
          className="text-green duration-300 ease-in-out hover:text-darkBlue"
          href={`/events/${slug}`}
        >
          {headline}
        </a>
      </h3>
      <p className="mb-1 block">{getDateWithTime(datetime)}</p>
      <p className="mb-2 block">{location}</p>
      {excerpt ? (
        <div {...inspectorProps({ fieldId: "excerpt" })}>
          {documentToReactComponents(excerpt.json, richTextRenderOptions)}
        </div>
      ) : null}
      <a
        className="mt-5 inline-block rounded-full bg-lightGreen px-4 py-1 font-bold uppercase text-white duration-300 ease-in-out hover:bg-darkBlue"
        href={`/events/${slug}`}
      >
        Learn More
      </a>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
