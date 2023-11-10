import { SectionBucketGrid } from "~/schemas/sections/section.bucket-grid.server"
import { Block, Inline, INLINES } from "@contentful/rich-text-types"
import { ReactNode } from "react"

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
        <div className="mx-auto max-w-screen-xl py-12"></div>
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
  },
}
