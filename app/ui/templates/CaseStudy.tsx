import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/case-study.$caseStudySlug"
import { type CaseStudy } from "~/models/case-study.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"
import type {
  AssetLinkSchema,
  LinksSchema,
} from "~/schemas/contentful-fields/rich-text.server"
import type { z } from "zod"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import Vimeo from "@u-wave/react-vimeo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ClientOnly } from "remix-utils/client-only"

type CaseStudyProps = CaseStudy

/**
 * Render options for the rich text renderer and the linked assets
 *
 * @link https://www.contentful.com/developers/docs/concepts/rich-text/#rendering-the-rich-text-response-from-the-graphql-api-with-linked-assets-and-entries-on-the-front-end
 */
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
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
        return <p className="mb-4 leading-relaxed text-black">{children}</p>
      },
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
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
                <source type="image/avif" srcSet={`${url}?fm=avif&w=2000`} />
                <source type="image/webp" srcSet={`${url}?fm=webp&w=2000`} />
                <source type="image/webp" srcSet={`${url}?fm=png&w=2000`} />
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
  partnerLogo,
  category,
  location,
  description,
  mainImage,
  video,
  mainContent,
  ctaText,
  ctaUrl,
}: CaseStudyProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          {partnerLogo ? (
            <motion.img
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
              }}
              className="mb-12 aspect-square w-[180px] rounded-full object-cover"
              src={partnerLogo.url}
              alt={partnerLogo.description || ""}
              width={partnerLogo.width}
              height={partnerLogo.height}
            />
          ) : null}
          {category ? <p className="uppercase">{category}</p> : null}
          <h1 className="text-3xl font-bold text-darkBlue">{headline}</h1>
          {location ? <p>{location}</p> : null}
          {description ? (
            <div className="mt-6 text-lg">
              {documentToReactComponents(
                description.json,
                richTextRenderOptions,
              )}
            </div>
          ) : null}
          {mainImage ? (
            <div className="my-6 w-full">
              <figure>
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${mainImage.url}?fm=avif&w=2000`}
                  />
                  <source
                    type="image/webp"
                    srcSet={`${mainImage.url}?fm=webp&w=2000`}
                  />
                  <source
                    type="image/webp"
                    srcSet={`${mainImage.url}?fm=png&w=2000`}
                  />
                  <motion.img
                    initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      ease: "linear",
                      duration: 0.5,
                    }}
                    className="mt-12 w-full rounded-xl"
                    src={mainImage.url}
                    alt={mainImage.description || ""}
                    width={mainImage.width}
                    height={mainImage.height}
                  />
                </picture>
                {mainImage.description ? (
                  <figcaption className="bg-gray-100 p-4 text-center dark:bg-gray-800">
                    {mainImage.description}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ) : null}
          {video ? (
            <div className="mt-12">
              {video.videoIdEnglish && video.videoIdSpanish ? (
                <Tabs defaultValue="english" className="w-full">
                  <TabsList>
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="spanish">Spanish</TabsTrigger>
                  </TabsList>
                  <TabsContent value="english">
                    <ClientOnly>
                      {() => (
                        <Vimeo
                          video={video.videoIdEnglish || ""}
                          width="979"
                          className="overflow-hidden rounded-xl"
                          responsive={true}
                        />
                      )}
                    </ClientOnly>
                  </TabsContent>
                  <TabsContent value="spanish">
                    <ClientOnly>
                      {() => (
                        <Vimeo
                          video={video.videoIdSpanish || ""}
                          width="979"
                          className="overflow-hidden rounded-xl"
                          responsive={true}
                        />
                      )}
                    </ClientOnly>
                  </TabsContent>
                </Tabs>
              ) : video.videoIdEnglish ? (
                <ClientOnly>
                  {() => (
                    <Vimeo
                      video={video.videoIdEnglish || ""}
                      width="979"
                      className="overflow-hidden rounded-xl"
                      responsive={true}
                    />
                  )}
                </ClientOnly>
              ) : video.videoIdSpanish ? (
                <ClientOnly>
                  {() => (
                    <Vimeo
                      video={video.videoIdSpanish || ""}
                      width="979"
                      className="overflow-hidden rounded-xl"
                      responsive={true}
                    />
                  )}
                </ClientOnly>
              ) : null}
            </div>
          ) : null}
          {mainContent ? (
            <div className="mx-auto mt-12 max-w-xl">
              {documentToReactComponents(
                mainContent.json,
                renderOptions(mainContent?.links),
              )}
            </div>
          ) : null}
          {ctaText && ctaUrl ? (
            <p className="mt-12 text-lg font-bold">
              <a
                className="text-darkBlue underline"
                href={ctaUrl}
                target="_blank"
                rel="noreferrer"
              >
                {ctaText}
              </a>
            </p>
          ) : null}
        </div>
      </main>
    </>
  )
}
