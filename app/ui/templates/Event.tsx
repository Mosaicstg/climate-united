import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/news.$postSlug"
import { type Event } from "~/models/event.server"
import { getDateWithTime } from "~/utils/datetime-to-readable"

type EventProps = Event

export function Event({
  title,
  slug,
  headline,
  datetime,
  location,
  mainContent,
}: EventProps) {
  return (
    <>
      <div className="mx-auto max-w-screen-lg py-12">
        <h1 className="mb-5 text-3xl font-bold text-green">{headline}</h1>
        <p className="uppercase">{getDateWithTime(datetime)}</p>
        <p className="mb-5">{location}</p>
        {documentToReactComponents(mainContent.json, richTextRenderOptions)}
      </div>
    </>
  )
}
