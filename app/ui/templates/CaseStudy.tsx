import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type CaseStudy } from "~/models/case-study.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { z } from "zod"
import type { ReactNode } from "react"
import type {
  AssetLinkSchema,
  LinksSchema,
} from "~/schemas/contentful-fields/rich-text.server"

type CaseStudyProps = CaseStudy

function renderOptions(links: z.infer<typeof LinksSchema>) {
  // create an asset map
  const assetMap = new Map<string, z.infer<typeof AssetLinkSchema>>()

  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset)
  }

  return {
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
      [BLOCKS.PARAGRAPH]: (_: Block | Inline, children: ReactNode) => {
        return (
          <p className="mb-4 text-base leading-relaxed text-black">
            {children}
          </p>
        )
      },
      [BLOCKS.HEADING_2]: (_: Block | Inline, children: ReactNode) => {
        return <h2 className="mb-5 text-3xl dark:text-gray-200">{children}</h2>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const { data } = node
        const { target } = data
        const asset = assetMap.get(target.sys.id)

        if (!asset) {
          return null
        }

        const { title, description, url, width, height } = asset

        return (
          <div className="my-6 w-full">
            <figure>
              <picture>
                <source type="image/avif" srcSet={`${url}?fm=avif`} />
                <source type="image/webp" srcSet={`${url}?fm=webp`} />
                <source type="image/webp" srcSet={`${url}?fm=png`} />
                <motion.img
                  src={url}
                  alt={title}
                  className="w-full overflow-hidden rounded-xl border"
                  width={width}
                  height={height}
                />
              </picture>
              {description ? (
                <figcaption className="bg-gray-100 p-4 text-center dark:bg-gray-800">
                  {description}
                </figcaption>
              ) : null}
            </figure>
          </div>
        )
      },
    },
  }
}

export function CaseStudy({
  headline,
  mainContent,
  featuredImage,
}: CaseStudyProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <div className="mx-auto max-w-sm">
            <motion.img
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
              }}
              className="mb-12 aspect-square w-full rounded-full object-cover"
              src={url}
              alt={description || ""}
              width={width}
              height={height}
            />
          </div>
          <h1 className="text-center text-3xl font-bold text-darkBlue">
            {headline}
          </h1>
          {mainContent
            ? documentToReactComponents(
                mainContent.json,
                renderOptions(mainContent?.links),
              )
            : null}
        </div>
      </main>
    </>
  )
}
