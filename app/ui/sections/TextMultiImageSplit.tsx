import type { SectionTextMultiImageSplit } from "~/schemas/sections/section.text-multi-image-split.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type SectionTextMultiImageSplitProps = SectionTextMultiImageSplit

export function TextMultiImageSplitSection({
  title,
  mainContent,
  featuredImagesCollection,
}: SectionTextMultiImageSplitProps) {
  return (
    <>
      <section className="border-t-4 border-solid border-green text-darkBlue">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:gap-[7rem] md:px-0">
          <div className="flex flex-row flex-wrap justify-center md:w-2/5">
            {featuredImagesCollection.items.map((image, index) => {
              let classes = ""
              switch (index % 3) {
                case 0:
                  classes = "bg-darkBlue"
                  break
                case 1:
                  classes = "bg-lightGreen"
                  break
                case 2:
                  classes = "bg-green md:-mt-1"
                  break
              }
              return (
                <div className="w-1/2 px-3" key={image.url}>
                  <img
                    className={`aspect-square w-full rounded-full object-contain p-7 ${classes}`}
                    src={image.url}
                    alt={image.description || ""}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              )
            })}
          </div>
          <div className="md:w-3/5">
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
          className="mt-5 inline-block rounded-full border-2 border-solid border-darkBlue px-6 py-3 font-bold"
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
