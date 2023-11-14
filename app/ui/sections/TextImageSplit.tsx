import type { SectionTextImageSplit } from "~/schemas/sections/section.text-image-split.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type SectionTextImageSplitProps = SectionTextImageSplit

export function TextImageSplitSection({
  title,
  mainContent,
  featuredImage,
}: SectionTextImageSplitProps) {
  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="border-t-4 border-solid border-green bg-paleGreen text-darkBlue">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:gap-[7rem] md:px-0">
          <div className="relative my-12 w-3/4 md:order-2 md:w-2/5">
            <div className="absolute bottom-[5%] right-[85%] h-[156px] w-[156px] translate-x-1/2 translate-y-1/3 rounded-full bg-yellow"></div>
            <div className="absolute right-[10%] top-[20%] h-[156px] w-[156px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue"></div>
            <img
              className="relative aspect-square w-full rounded-full object-cover"
              src={url}
              alt={description}
              width={width}
              height={height}
            />
          </div>
          <div className="md:order-1 md:w-3/5">
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </div>
        </div>
      </section>
    </>
  )
}

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="mt-5 inline-block rounded-full border-2 border-solid border-darkBlue px-6 py-3 font-bold duration-300 ease-in-out hover:bg-darkBlue hover:text-paleGreen"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-2xl font-bold md:text-4xl">{children}</h2>
    },
  },
}
