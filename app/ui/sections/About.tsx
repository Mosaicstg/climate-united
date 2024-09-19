import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type SectionAbout } from "~/schemas/sections/section.about.server"
import { motion, useReducedMotion } from "framer-motion"
import { getRenderRichTextContentOptions } from "~/utils/rich-text-render-options"

type SectionAboutProps = SectionAbout

export function AboutSection({
  mainContent,
  featuredImage,
  imagesCollection,
}: SectionAboutProps) {
  const prefersReducedMotion = useReducedMotion()

  const renderOptions = getRenderRichTextContentOptions({
    renderOptions: richTextRenderOptions,
    links: mainContent?.links,
  })

  return (
    <section>
      <div className="mx-auto mb-12 max-w-screen-lg px-6 text-darkBlue md:px-5">
        {featuredImage ? (
          <motion.img
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
            }}
            className="aspect-[32/9] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description || ""}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
      </div>
      <div className="mx-auto mb-12 max-w-[912px] px-6 text-darkBlue md:px-5">
        <motion.div
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            x: prefersReducedMotion ? 0 : "-5rem",
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: "linear",
            duration: 0.5,
            delay: 0.5,
          }}
          className="relative"
        >
          {mainContent
            ? documentToReactComponents(mainContent.json, renderOptions)
            : null}
          <div>
            {imagesCollection.items.map((image, index) => {
              return (
                <img
                  className="mx-auto mt-8 w-3/4"
                  key={image.url}
                  src={image.url}
                  alt={image.description || ""}
                  width={image.width}
                  height={image.height}
                />
              )
            })}
          </div>
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
        <p className="mx-auto mb-4 text-base leading-relaxed">{children}</p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h2 className="mb-5 text-3xl font-bold md:-mx-8 xl:-mx-12">
          {children}
        </h2>
      )
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
