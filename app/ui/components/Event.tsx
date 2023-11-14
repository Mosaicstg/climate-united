import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type Event } from "~/models/event.server"
import { getDateWithTime } from "~/utils/datetime-to-readable"

type EventProps = Event

export function Event({
  title,
  slug,
  headline,
  datetime,
  location,
  excerpt,
  mainContent,
}: EventProps) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 text-xl font-bold">
        <a
          className="text-green duration-300 ease-in-out hover:text-darkBlue"
          href={`/events/${slug}`}
        >
          {headline}
        </a>
      </h3>
      <p>{getDateWithTime(datetime)}</p>
      <p className="mb-2">{location}</p>
      {excerpt
        ? documentToReactComponents(excerpt.json, richTextRenderOptions)
        : null}
      <a
        className="mt-5 inline-block rounded-full bg-green px-4 py-1 font-bold uppercase text-white duration-300 ease-in-out hover:bg-darkBlue"
        href={`/events/${slug}`}
      >
        Register Here
      </a>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
