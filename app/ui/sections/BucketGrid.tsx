import type { SectionBucketGrid } from "~/schemas/sections/section.bucket-grid.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Bucket } from "~/ui/components/Bucket"
import { motion, useReducedMotion } from "framer-motion"

type SectionBucketGridProps = SectionBucketGrid

export function BucketGridSection({
  title,
  headline,
  mainContent,
  bucketsCollection,
}: SectionBucketGridProps) {
  const prefersReducedMotion = useReducedMotion()

  const buckets = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  }

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green text-darkBlue">
        <div className="mx-auto max-w-screen-xl px-6 py-12 text-center md:px-0">
          <motion.h2
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              top: prefersReducedMotion ? "0" : "-5rem",
            }}
            whileInView={{ opacity: 1, top: "0" }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
              delay: 0.5,
            }}
            className="relative mb-10 text-2xl font-bold md:text-3xl"
          >
            {headline}
          </motion.h2>
          <motion.div
            variants={buckets}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-12 md:flex-row"
          >
            {bucketsCollection.items.map((bucket, index) => {
              let shadowColor = "bg-green"
              switch (index % 4) {
                case 0:
                  shadowColor = "bg-green"
                  break
                case 1:
                  shadowColor = "bg-yellow"
                  break
                case 2:
                  shadowColor = "bg-blue"
                  break
                case 3:
                  shadowColor = "bg-lightGreen"
                  break
              }
              return (
                <Bucket
                  key={bucket.title}
                  title={bucket.title}
                  bucketText={bucket.bucketText}
                  bucketImage={bucket.bucketImage}
                  shadowColor={shadowColor}
                />
              )
            })}
          </motion.div>
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
            className="relative mx-auto max-w-screen-md"
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
          className="mt-5 inline-block rounded-full border-2 border-solid border-darkBlue px-6 py-3 font-bold"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return <p className="text-lg">{children}</p>
    },
  },
}
