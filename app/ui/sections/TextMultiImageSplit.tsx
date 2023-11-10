import { SectionTextMultiImageSplit } from "~/schemas/sections/section.text-multi-image-split.server"
import { Block, Inline, INLINES } from "@contentful/rich-text-types"
import { ReactNode } from "react"
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
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 py-12 md:flex-row">
          <div className="md:w-1/2">
            {featuredImagesCollection.items.map((image) => {
              return (
                <img
                  className="mb-12 w-full rounded-full"
                  src={image.url}
                  alt={image.description}
                  width={image.width}
                  height={image.height}
                />
              )
            })}
          </div>
          <div className="md:w-1/2">
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
  },
}
