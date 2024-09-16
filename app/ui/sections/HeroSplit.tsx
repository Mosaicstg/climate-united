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
      <section className="items-center gap-0 overflow-hidden bg-lightGreen text-white md:grid md:grid-cols-2">
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
          className="mt-5 inline-block rounded-full border-2 border-solid border-white px-6 py-3 font-bold duration-300 ease-in-out hover:bg-white hover:text-lightGreen"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return (
        <p className="mx-auto mb-4 text-base leading-relaxed">{children}</p>
      )
    },
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h1 className="mb-5 text-3xl font-semibold md:text-5xl">{children}</h1>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl font-bold">{children}</h2>
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return <h3 className="mx-auto mb-5 text-xl font-bold">{children}</h3>
    },
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: ReactNode) => {
      return <ul className="ml-12 list-disc">{children}</ul>
    },
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: ReactNode) => {
      return <ol className="ml-12 list-decimal">{children}</ol>
    },
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: ReactNode) => {
      return <li>{children}</li>
    },
  },
}
