import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/news.$postSlug"
import { type Event } from "~/models/event.server"
import { transformDateTimeStringToHumanReadable } from "~/utils/datetime-to-readable"

type EventProps = Event

export function Event({ title, headline, datetime, mainContent }: EventProps) {
  return (
    <>
      <div className="mx-auto max-w-screen-lg py-12">
        <h1 className="mb-5 text-3xl font-bold text-green">{headline}</h1>
        <p className="mb-5 uppercase">
          {transformDateTimeStringToHumanReadable(datetime)}
        </p>
        {documentToReactComponents(mainContent.json, richTextRenderOptions)}
      </div>
    </>
  )
}
