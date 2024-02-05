import type { SectionHero } from "~/schemas/sections/section.hero.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { motion, useReducedMotion } from "framer-motion"

type SectionHeroProps = SectionHero

export function HeroSection({
  title,
  mainContent,
  featuredImage,
}: SectionHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="overflow-hidden bg-lightGreen text-white">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-12 md:flex-row md:px-0 md:pl-5 md:py-[10rem]">
          <motion.div
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              left: prefersReducedMotion ? "0" : "-5rem",
            }}
            whileInView={{ opacity: 1, left: "0" }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
              delay: 0.5,
            }}
            className="relative w-4/5 pb-[18rem] md:w-1/2 md:pb-0"
          >
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </motion.div>
          <div className="relative md:w-1/2">
            <motion.div
              initial={{ padding: prefersReducedMotion ? "0" : "5rem" }}
              whileInView={{ padding: "0" }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 1,
              }}
              className="absolute -right-6 bottom-0 w-[150%] translate-x-[25%] translate-y-[40%] md:translate-x-[40%] md:translate-y-[45%]"
            >
              <motion.div
                initial={{ padding: prefersReducedMotion ? "1.25rem" : "0" }}
                whileInView={{ padding: "1.25rem" }}
                viewport={{ once: true }}
                transition={{
                  ease: "linear",
                  duration: 0.25,
                  delay: 0.75,
                }}
                className="rounded-full bg-[#52C4A5] p-5"
              >
                <motion.div
                  initial={{ padding: prefersReducedMotion ? "1.25rem" : "0" }}
                  whileInView={{ padding: "1.25rem" }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "linear",
                    duration: 0.25,
                    delay: 0.5,
                  }}
                  className="rounded-full bg-[#73CFB7] p-5"
                >
                  <motion.div
                    initial={{
                      padding: prefersReducedMotion ? "1.25rem" : "0",
                    }}
                    whileInView={{ padding: "1.25rem" }}
                    viewport={{ once: true }}
                    transition={{
                      ease: "linear",
                      duration: 0.25,
                      delay: 0.25,
                    }}
                    className="rounded-full bg-[#A8E0D3] p-5"
                  >
                    <motion.div
                      initial={{
                        padding: prefersReducedMotion ? "1.25rem" : "0",
                      }}
                      whileInView={{ padding: "1.25rem" }}
                      viewport={{ once: true }}
                      transition={{
                        ease: "linear",
                        duration: 0.25,
                      }}
                      className="rounded-full bg-[#D8F0EC] p-5"
                    >
                      <img
                        className="w-full rounded-full"
                        src={url}
                        alt={description || ""}
                        width={width}
                        height={height}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
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
