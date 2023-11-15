import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type SectionAbout } from "~/schemas/sections/section.about.server"
import { motion } from "framer-motion"

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
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              ease: "linear",
              duration: 0.5,
            }}
            className="mb-12 aspect-[32/9] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description || ""}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
        <motion.div
          initial={{ opacity: 0, left: "-5rem" }}
          whileInView={{ opacity: 1, left: "0" }}
          transition={{
            ease: "linear",
            duration: 0.5,
            delay: 0.5,
          }}
          className="relative"
        >
          {documentToReactComponents(mainContent.json, richTextRenderOptions)}
        </motion.div>
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
        <p className="mx-auto mb-4 text-base leading-relaxed md:px-12">
          {children}
        </p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl font-bold">{children}</h2>
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h3 className="mx-auto mb-5 text-xl font-bold md:px-12">{children}</h3>
      )
    },
  },
}
