import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer"
import { type Post } from "~/models/post.server"
import { getDate } from "~/utils/datetime-to-readable"
import Header from "~/ui/components/Header"
import {
  defaultRichTextRenderOptions,
  getRenderRichTextContentOptions,
} from "~/utils/rich-text-render-options"

type PostProps = Post

const richTextRenderOptions: Options = {
  ...defaultRichTextRenderOptions,
}

export function Post({ headline, date, mainContent }: PostProps) {
  const renderOptions = getRenderRichTextContentOptions({
    renderOptions: richTextRenderOptions,
    links: mainContent?.links,
  })

  return (
    <>
      <Header useGreenHeaderStyle />
      <main>
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <h1 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h1>
          <p className="mb-5 uppercase">{getDate(date)}</p>
          {documentToReactComponents(mainContent.json, renderOptions)}
        </div>
      </main>
    </>
  )
}
