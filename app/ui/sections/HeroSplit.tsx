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
    imageAlignment == "Image Right"
      ? "md:ml-auto md:pl-5 md:pr-10 lg:pr-20 md:order-1"
      : "md:mr-auto md:pr-5 md:pl-10 lg:pl-20"

  return (
    <>
      <section className="items-center gap-0 overflow-hidden bg-white text-darkBlue md:grid md:grid-cols-2">
        <div
          className={`max-w-full bg-[#82A59C] md:aspect-video md:min-h-full ${imageAlignmentClass}`}
        >
          <img
            className="min-h-full w-full object-cover object-center"
            src={url}
            alt={description || ""}
            width={width}
            height={height}
          />
        </div>
        <div
          className={`w-full px-6 py-10 md:max-w-screen-sm lg:py-20 ${containerAlignmentClass}`}
        >
          {documentToReactComponents(mainContent.json, richTextRenderOptions)}
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
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h1 className="mb-5 text-3xl font-semibold md:text-5xl">{children}</h1>
      )
    },
  },
}
