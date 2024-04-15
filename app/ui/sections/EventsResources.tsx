import type { SectionEventsResources } from "~/schemas/sections/section.events-resources.server"
import { Event } from "~/ui/components/Event"
import { Resource } from "~/ui/components/Resource"
import { motion, useReducedMotion } from "framer-motion"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { useContentfulInspectorMode } from "@contentful/live-preview/react"

type SectionEventsResourcesProps = SectionEventsResources

export function EventsResourcesSection({
  title,
  headlineEvents,
  eventsCollection,
  textEvents,
  headlineResources,
  resourcesCollection,
  featuredImage,
  sys,
}: SectionEventsResourcesProps) {
  const prefersReducedMotion = useReducedMotion()

  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-12 md:flex-row md:gap-[12rem] md:px-5">
          <div className="md:w-1/2">
            <h2
              className="mb-5 text-3xl font-bold"
              {...inspectorProps({ fieldId: "headlineEvents" })}
            >
              {headlineEvents}
            </h2>
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
              className="relative md:pl-6"
            >
              {eventsCollection.items.map((event, index) => {
                return <Event key={`${event.slug}-${index}`} {...event} />
              })}
            </motion.div>
            {textEvents ? (
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
                className="relative pt-12 md:pl-6"
                {...inspectorProps({ fieldId: "textEvents" })}
              >
                {documentToReactComponents(
                  textEvents.json,
                  richTextRenderOptions,
                )}
              </motion.div>
            ) : null}
          </div>
          <div className="md:w-1/2">
            <h2
              className="mb-5 text-3xl font-bold"
              {...inspectorProps({ fieldId: "headlineResources" })}
            >
              {headlineResources}
            </h2>
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
              {resourcesCollection.items.map((resource) => {
                return <Resource key={resource.title} {...resource} />
              })}
            </motion.div>
            {featuredImage ? (
              <div
                className="relative mx-auto mt-[5rem] w-[75%]"
                {...inspectorProps({ fieldId: "featuredImage" })}
              >
                <motion.img
                  initial={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
                  }}
                  whileInView={{ opacity: 1, transform: "scale(1)" }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "linear",
                    duration: 0.5,
                  }}
                  className="relative z-10 aspect-square w-full rounded-full object-cover"
                  src={featuredImage.url}
                  alt={featuredImage.description || ""}
                  width={featuredImage.width}
                  height={featuredImage.height}
                />
                <motion.div
                  initial={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
                  }}
                  whileInView={{ opacity: 1, transform: "scale(1)" }}
                  viewport={{ once: true }}
                  transition={{
                    ease: "linear",
                    duration: 0.5,
                    delay: 0.25,
                  }}
                  className="absolute -left-8 -top-8 h-[156px] w-[156px] rounded-full bg-darkBlue"
                ></motion.div>
              </div>
            ) : null}
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
      return <p className="mb-4 text-base leading-relaxed">{children}</p>
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h3 className="mx-auto mb-5 text-xl font-bold md:px-12">{children}</h3>
      )
    },
  },
}
