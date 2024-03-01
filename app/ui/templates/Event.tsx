import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type Event } from "~/models/event.server"
import Header from "~/ui/components/Header"
import { BLOCKS, type Block, INLINES, type Inline } from "@contentful/rich-text-types"
import { type ReactNode } from "react"

type EventProps = Event

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
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <h1 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h1>
          <p className="uppercase">{datetime}</p>
          <p className="mb-5">{location}</p>
          {documentToReactComponents(mainContent.json, richTextRenderOptions)}
        </div>
      </main>
    </>
  )
}
