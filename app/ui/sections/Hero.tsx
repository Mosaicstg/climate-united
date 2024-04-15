import type { SectionHero } from "~/schemas/sections/section.hero.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { motion, useReducedMotion } from "framer-motion"
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react"

type SectionHeroProps = SectionHero

export function HeroSection(props: SectionHeroProps) {
  const { sys } = props
  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })
  const prefersReducedMotion = useReducedMotion()
  const updatedProps = useContentfulLiveUpdates(props)

  const { mainContent, featuredImage } = updatedProps

  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="overflow-hidden bg-lightGreen text-white">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-6 py-12 md:flex-row md:gap-12 md:px-0 md:py-[10rem] md:pl-5">
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
            className="relative z-10 w-4/5 md:w-3/4 md:pb-[18rem] lg:w-1/2 lg:pb-0"
            {...inspectorProps({ fieldId: "mainContent" })}
          >
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </motion.div>
          <div
            className="relative -mt-[35%] md:mt-0 md:w-3/4 lg:w-1/2"
            {...inspectorProps({ fieldId: "featuredImage" })}
          >
            <motion.div
              initial={{ padding: prefersReducedMotion ? 0 : "5rem" }}
              whileInView={{ padding: 0 }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 1,
              }}
              className="relative w-[140%] translate-x-[2%] translate-y-[35%] md:absolute md:-right-6 md:bottom-0 md:w-[150%] md:translate-x-[25%] md:translate-y-[40%] lg:translate-x-[40%] lg:translate-y-[45%]"
            >
              <motion.div
                initial={{ padding: prefersReducedMotion ? "1.25rem" : 0 }}
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
                  initial={{ padding: prefersReducedMotion ? "1.25rem" : 0 }}
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
                      padding: prefersReducedMotion ? "1.25rem" : 0,
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
                        padding: prefersReducedMotion ? "1.25rem" : 0,
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
