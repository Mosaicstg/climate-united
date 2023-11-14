import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/news.$postSlug"
import { type Event } from "~/models/event.server"
import { getDateWithTime } from "~/utils/datetime-to-readable"
import Header from "~/ui/components/Header"

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
      <Header />
      <main>
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-0">
          <h1 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h1>
          <p className="uppercase">{getDateWithTime(datetime)}</p>
          <p className="mb-5">{location}</p>
          {documentToReactComponents(mainContent.json, richTextRenderOptions)}
        </div>
      </main>
    </>
  )
}
