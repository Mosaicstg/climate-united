import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type CaseStudy } from "~/models/case-study.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import Vimeo from "@u-wave/react-vimeo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ClientOnly } from "remix-utils/client-only"
import { getRenderRichTextContentOptions } from "~/utils/rich-text-render-options"

type CaseStudyProps = CaseStudy

const richTextRenderOptions = {
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
  },
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
  const renderOptions = getRenderRichTextContentOptions({
    renderOptions: richTextRenderOptions,
    links: mainContent?.links,
  })

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
              className="mb-12 w-[180px]"
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
                    <TabsTrigger
                      value="english"
                      aria-label="View English video"
                    >
                      English
                    </TabsTrigger>
                    <TabsTrigger
                      value="spanish"
                      aria-label="View Spanish video"
                    >
                      Spanish
                    </TabsTrigger>
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
              {documentToReactComponents(mainContent.json, renderOptions)}
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
