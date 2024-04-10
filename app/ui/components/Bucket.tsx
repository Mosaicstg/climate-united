import { type Bucket } from "~/models/bucket.server"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useContentfulInspectorMode } from "@contentful/live-preview/react"

type BucketProps = Bucket & { shadowColor: string }

export function Bucket({
  bucketText,
  bucketImage,
  shadowColor = "bg-green",
  sys,
}: BucketProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = bucketImage

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

  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <div className="md:w-1/4">
      <div
        className="relative mx-auto mb-10 w-1/2 md:w-full"
        {...inspectorProps({ fieldId: "bucketImage" })}
      >
        <motion.img
          variants={image}
          transition={{
            ease: "linear",
          }}
          className="relative z-10 aspect-square w-full rounded-full object-cover"
          src={url}
          alt={description || ""}
          width={width}
          height={height}
        />
        <div
          className={`absolute bottom-0 left-0 aspect-square w-full translate-y-[50%] scale-y-[.15] rounded-full ${shadowColor}`}
        ></div>
      </div>
      <motion.div
        variants={text}
        transition={{
          ease: "linear",
        }}
        className="relative"
        {...inspectorProps({ fieldId: "bucketText" })}
      >
        {documentToReactComponents(bucketText.json, richTextRenderOptions)}
      </motion.div>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return <h3 className="text-xl font-bold">{children}</h3>
    },
  },
}
