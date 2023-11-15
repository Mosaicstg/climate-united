import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/about-the-greenhouse-gas-reduction-fund"
import { type Page } from "~/models/page.server"
import Header from "~/ui/components/Header"

type PageProps = Page

export function Page({
  title,
  headline,
  mainContent,
  featuredImage,
}: PageProps) {
  const { url, description, width, height } = featuredImage
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-0">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="relative my-12 md:order-2 md:w-1/3">
              <div className="right-3/5 absolute bottom-0 h-[156px] w-[156px] translate-x-1/2 translate-y-1/3 rounded-full bg-lightGreen"></div>
              <div className="absolute right-1/4 top-0 h-[156px] w-[156px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue"></div>
              <img
                className="relative aspect-square w-full rounded-full object-cover"
                src={url}
                alt={description || ""}
                width={width}
                height={height}
              />
            </div>
            <div className="text-darkBlue md:order-1 md:w-2/3">
              <h1 className="mb-5 text-3xl font-bold">{headline}</h1>
              {documentToReactComponents(
                mainContent.json,
                richTextRenderOptions,
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
