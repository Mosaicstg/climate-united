import type { SectionTextImage } from "~/schemas/sections/section.text-image.server"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type SectionTextImageProps = SectionTextImage

export function TextImageSection({
  title,
  mainContent,
  featuredImage,
}: SectionTextImageProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green bg-paleGreen px-6 text-center text-darkBlue md:px-0">
        <div className="mx-auto max-w-screen-lg py-12">
          <motion.img
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
              delay: 0.5,
            }}
            className="mb-12 w-full"
            src={url}
            alt={description || ""}
            width={width}
            height={height}
          />
          <motion.div
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              bottom: prefersReducedMotion ? "0" : "-5rem",
            }}
            whileInView={{ opacity: 1, bottom: "0" }}
            viewport={{ once: true }}
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
