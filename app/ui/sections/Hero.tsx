import type { SectionHero } from "~/schemas/sections/section.hero.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { motion, useReducedMotion } from "framer-motion"

type SectionHeroProps = SectionHero

export function HeroSection({ mainContent, featuredImage }: SectionHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="relative bg-lightGreen text-white before:absolute before:left-0 before:top-0 before:z-10 before:block before:h-full before:w-full before:bg-darkBlue before:opacity-35">
        <img
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
          src={url}
          alt={description || ""}
          width={width}
          height={height}
        />
        <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-6 py-12 md:flex-row md:gap-12 md:px-0 md:pb-[10rem] md:pl-5 md:pt-[15rem]">
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
            className="relative z-20 w-4/5 md:w-3/4 md:pb-[18rem] lg:w-1/2 lg:pb-0"
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
          className="mt-5 inline-block rounded-full border-2 border-solid border-white px-6 py-3 font-bold duration-300 ease-in-out hover:bg-white hover:text-lightGreen"
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
