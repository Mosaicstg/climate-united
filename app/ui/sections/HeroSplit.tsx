import type { SectionHeroSplit } from "~/schemas/sections/section.hero-split.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import React from "react"

type SectionHeroSplitProps = SectionHeroSplit

export function HeroSplitSection({
  mainContent,
  imageAlignment,
  featuredImage,
}: SectionHeroSplitProps) {
  const { url, description, width, height } = featuredImage

  let imageAlignmentClass = imageAlignment == "Image Right" ? "md:order-2" : ""

  let containerAlignmentClass =
    imageAlignment == "Image Right" ? "md:order-1" : ""

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green bg-paleGreen text-darkBlue">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:gap-[7rem] md:px-5">
          <div
            className={`relative my-12 w-full md:w-1/2 ${imageAlignmentClass}`}
          >
            <div className="max-w-full bg-[#82A59C] md:aspect-video md:min-h-full">
              <img
                className="min-h-full w-full object-cover object-center"
                src={url}
                alt={description || ""}
                width={width}
                height={height}
              />
            </div>
          </div>
          <div
            className={`relative w-full md:w-1/2 ${containerAlignmentClass}`}
          >
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
