import type { SectionStatBucketGrid } from "~/schemas/sections/section.stat-bucket-grid.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { StatBucket } from "~/ui/components/StatBucket"
import { motion, useReducedMotion } from "framer-motion"
import React from "react"

type SectionStatBucketGridProps = SectionStatBucketGrid

export function StatBucketGridSection({
  headline,
  mainContent,
  statBucketsCollection,
}: SectionStatBucketGridProps) {
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
    <section className="overflow-hidden text-darkBlue">
      <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5 xl:max-w-screen-xl">
        <motion.h2
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            y: prefersReducedMotion ? 0 : "-5rem",
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: "linear",
            duration: 0.5,
          }}
          className="relative mb-10 text-2xl font-bold md:text-3xl"
        >
          {headline}
        </motion.h2>
        <motion.div
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            y: prefersReducedMotion ? 0 : "-5rem",
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: "linear",
            duration: 0.5,
            delay: 0.5,
          }}
          className="relative"
        >
          {mainContent
            ? documentToReactComponents(mainContent.json, richTextRenderOptions)
            : null}
        </motion.div>
        <motion.div
          variants={buckets}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-12 md:grid-cols-3"
        >
          {statBucketsCollection.items.map((bucket, index) => {
            return (
              <StatBucket
                key={bucket.title}
                title={bucket.title}
                headline={bucket.headline}
                subheadline={bucket.subheadline}
                bucketText={bucket.bucketText}
                bucketImage={bucket.bucketImage}
                link={bucket.link}
              />
            )
          })}
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
          className="mt-5 inline-block rounded-full border-2 border-solid border-darkBlue px-6 py-3 font-bold"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return <p className="mx-auto mb-4 text-lg leading-relaxed">{children}</p>
    },
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h1 className="mb-5 text-3xl font-semibold md:text-5xl">{children}</h1>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl font-bold">{children}</h2>
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
