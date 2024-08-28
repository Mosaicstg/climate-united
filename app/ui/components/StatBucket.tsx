import { type StatBucket } from "~/models/stat-bucket.server"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type StatBucketProps = StatBucket

export function StatBucket({
  title,
  headline,
  subheadline,
  bucketText,
  bucketImage,
  link,
}: StatBucketProps) {
  const prefersReducedMotion = useReducedMotion()

  const image = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : "-5rem",
    },
    show: { opacity: 1, y: 0 },
  }

  const text = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : "5rem",
    },
    show: { opacity: 1, y: 0 },
  }

  let statBucket = (
    <div className="text-center">
      <div className="relative mx-auto mb-5 w-full">
        {bucketImage ? (
          <motion.img
            variants={image}
            transition={{
              ease: "linear",
            }}
            className="relative z-10 aspect-[3/2] w-full object-cover"
            src={bucketImage.url}
            alt={bucketImage.description || ""}
            width={bucketImage.width}
            height={bucketImage.height}
          />
        ) : null}
      </div>
      <motion.div
        variants={text}
        transition={{
          ease: "linear",
        }}
        className="relative text-sm"
      >
        {headline ? (
          <h3 className="relative mb-3 text-3xl font-bold md:text-4xl">
            {headline}
          </h3>
        ) : null}
        {subheadline ? (
          <h4 className="relative mb-3 text-lg font-bold md:text-xl">
            {subheadline}
          </h4>
        ) : null}
        {bucketText
          ? documentToReactComponents(bucketText.json, richTextRenderOptions)
          : null}
      </motion.div>
    </div>
  )

  if (link) {
    statBucket = <a href={link}>{statBucket}</a>
  }

  return statBucket
}

export const richTextRenderOptions = {
  renderNode: {
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return <h3 className="text-xl font-bold">{children}</h3>
    },
  },
}
