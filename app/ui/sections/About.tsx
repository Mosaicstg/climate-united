import { Block, BLOCKS, Inline, INLINES } from "@contentful/rich-text-types"
import { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type SectionAbout } from "~/schemas/sections/section.about.server"

type SectionAboutProps = SectionAbout

export function AboutSection({
  title,
  mainContent,
  featuredImage,
}: SectionAboutProps) {
  return (
    <section>
      <div className="mx-auto mb-12 max-w-screen-lg text-darkBlue">
        {featuredImage ? (
          <img
            className="mb-12 aspect-[32/9] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
        {documentToReactComponents(mainContent.json, richTextRenderOptions)}
      </div>
    </section>
  )
}

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="text-primary underline dark:text-gray-400"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return (
        <p className="mx-auto mb-4 px-12 text-base leading-relaxed">
          {children}
        </p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl font-bold">{children}</h2>
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h3 className="mx-auto mb-5 px-12 text-xl font-bold">{children}</h3>
      )
    },
  },
}
