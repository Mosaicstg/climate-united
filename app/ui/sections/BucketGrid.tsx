import type { SectionBucketGrid } from "~/schemas/sections/section.bucket-grid.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Bucket } from "~/ui/components/Bucket"

type SectionBucketGridProps = SectionBucketGrid

export function BucketGridSection({
  title,
  headline,
  mainContent,
  bucketsCollection,
}: SectionBucketGridProps) {
  return (
    <>
      <section className="border-t-4 border-solid border-green text-darkBlue">
        <div className="mx-auto max-w-screen-xl py-12 text-center">
          <h2 className="mb-10 text-3xl font-bold">{headline}</h2>
          <div className="mb-10 flex flex-col gap-12 md:flex-row">
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
          </div>
          <div className="mx-auto max-w-screen-md">
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
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
