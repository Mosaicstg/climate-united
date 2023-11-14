import type { SectionTextImage } from "~/schemas/sections/section.text-image.server"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"

type SectionTextImageProps = SectionTextImage

export function TextImageSection({
  title,
  mainContent,
  featuredImage,
}: SectionTextImageProps) {
  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="border-t-4 border-solid border-green bg-paleGreen px-6 text-center text-darkBlue md:px-0">
        <div className="mx-auto max-w-screen-lg py-12">
          <img
            className="mb-12 w-full"
            src={url}
            alt={description}
            width={width}
            height={height}
          />
          <div>
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
  },
}
