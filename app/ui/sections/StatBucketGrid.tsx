import type { SectionStatBucketGrid } from "~/schemas/sections/section.stat-bucket-grid.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { StatBucket } from "~/ui/components/StatBucket"
import { motion, useReducedMotion } from "framer-motion"

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
    <section className="overflow-hidden border-t-4 border-solid border-green text-darkBlue">
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-5">
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
          {documentToReactComponents(mainContent.json, richTextRenderOptions)}
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
      return <p className="text-lg">{children}</p>
    },
  },
}
