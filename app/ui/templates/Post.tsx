import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/news.$postSlug"
import { type Post } from "~/models/post.server"
import { getDate } from "~/utils/datetime-to-readable"
import Header from "~/ui/components/Header"

type PostProps = Post

export function Post({ title, headline, date, mainContent }: PostProps) {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <h1 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h1>
          <p className="mb-5 uppercase">{getDate(date)}</p>
          {documentToReactComponents(mainContent.json, richTextRenderOptions)}
        </div>
      </main>
    </>
  )
}
