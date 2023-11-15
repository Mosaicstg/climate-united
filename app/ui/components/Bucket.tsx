import { type Bucket } from "~/models/bucket.server"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS } from "@contentful/rich-text-types"
import type { ReactNode } from "react"

type BucketProps = Bucket & { shadowColor: string }

export function Bucket({
  title,
  bucketText,
  bucketImage,
  shadowColor = "bg-green",
}: BucketProps) {
  const { url, description, width, height } = bucketImage

  return (
    <div className="md:w-1/4">
      <div className="relative mx-auto mb-10 w-1/2 md:w-full">
        <div
          className={`absolute bottom-0 left-0 aspect-square w-full translate-y-[50%] scale-y-[.15] rounded-full ${shadowColor}`}
        ></div>
        <img
          className="relative aspect-square w-full rounded-full object-cover"
          src={url}
          alt={description || ""}
          width={width}
          height={height}
        />
      </div>
      <div>
        {documentToReactComponents(bucketText.json, richTextRenderOptions)}
      </div>
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
