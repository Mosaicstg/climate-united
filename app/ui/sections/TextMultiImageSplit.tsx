import type { SectionTextMultiImageSplit } from "~/schemas/sections/section.text-multi-image-split.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { motion, useReducedMotion } from "framer-motion"

type SectionTextMultiImageSplitProps = SectionTextMultiImageSplit

export function TextMultiImageSplitSection({
  mainContent,
  featuredImagesCollection,
}: SectionTextMultiImageSplitProps) {
  const prefersReducedMotion = useReducedMotion()

  const variant1 = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      x: prefersReducedMotion ? 0 : "-5rem",
    },
    show: {
      opacity: 1,
      x: 0,
    },
  }

  const variant2 = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      x: prefersReducedMotion ? 0 : "5rem",
    },
    show: {
      opacity: 1,
      x: 0,
    },
  }

  const variant3 = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : "5rem",
    },
    show: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green text-darkBlue">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:gap-[7rem] md:px-5">
          <div className="flex flex-row flex-wrap justify-center md:w-2/5">
            {featuredImagesCollection.items.map((image, index) => {
              let animationVariant = {}
              let classes = ""
              switch (index % 3) {
                case 0:
                  animationVariant = variant1
                  classes = "bg-darkBlue"
                  break
                case 1:
                  animationVariant = variant2
                  classes = "bg-lightGreen"
                  break
                case 2:
                  animationVariant = variant3
                  classes = "bg-green md:-mt-1"
                  break
              }
              return (
                <div className="w-1/2 px-3" key={image.url}>
                  <motion.img
                    variants={animationVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{
                      ease: "linear",
                      duration: 0.5,
                      delay: 0.5,
                    }}
                    className={`relative aspect-square w-full rounded-full object-contain p-7 ${classes}`}
                    src={image.url}
                    alt={image.description || ""}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              )
            })}
          </div>
          <motion.div
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              x: prefersReducedMotion ? 0 : "5rem",
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
              delay: 0.5,
            }}
            className="relative md:w-3/5"
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
          className="text-primary underline dark:text-gray-400"
          target="_blank"
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
