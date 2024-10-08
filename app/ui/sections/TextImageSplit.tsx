import type { SectionTextImageSplit } from "~/schemas/sections/section.text-image-split.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "~/lib/utils"

type SectionTextImageSplitProps = SectionTextImageSplit

export function TextImageSplitSection({
  mainContent,
  buttonsCollection,
  imageAlignment,
  imageShape,
  featuredImage,
}: SectionTextImageSplitProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  let defaultImage = (
    <motion.div
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        x: prefersReducedMotion ? 0 : "-5rem",
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        ease: "linear",
        duration: 0.5,
        delay: 0.5,
      }}
      className="relative"
    >
      {featuredImage ? (
        <img
          className="aspect-[3/2] w-full rounded-xl object-cover"
          src={featuredImage.url}
          alt={featuredImage.description || ""}
          width={featuredImage.width}
          height={featuredImage.height}
        />
      ) : null}
    </motion.div>
  )

  let circleImage = (
    <>
      <motion.img
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
        }}
        whileInView={{ opacity: 1, transform: "scale(1)" }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
        className="relative z-10 aspect-square w-full rounded-full object-cover"
        src={url}
        alt={description || ""}
        width={width}
        height={height}
      />
      <motion.div
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
        }}
        whileInView={{ opacity: 1, transform: "scale(1)" }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 0.5,
          delay: 0.25,
        }}
        className="absolute right-[-2rem] top-0 h-[156px] w-[156px] rounded-full bg-blue"
      ></motion.div>
      <motion.div
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
        }}
        whileInView={{ opacity: 1, transform: "scale(1)" }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 0.5,
          delay: 0.5,
        }}
        className="absolute bottom-[-3rem] left-0 h-[156px] w-[156px] rounded-full bg-yellow"
      ></motion.div>
    </>
  )

  let imageAlignmentClass = imageAlignment == "Image Right" ? "md:order-2" : ""

  let imageContainerClasses =
    imageShape == "Circle Image" ? "md:w-2/5" : "md:w-1/2"

  let containerAlignmentClass =
    imageAlignment == "Image Right" ? "md:order-1" : ""

  let contentContainerClasses =
    imageShape == "Circle Image" ? "md:w-3/5" : "md:w-1/2"

  return (
    <>
      <section className="overflow-hidden bg-paleGreen text-darkBlue">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-12 px-6 py-12 md:flex-row md:gap-[7rem] md:px-5 xl:max-w-screen-xl">
          <div
            className={cn(
              "relative my-12 w-3/4",
              imageAlignmentClass,
              imageContainerClasses,
            )}
          >
            {imageShape == "Circle Image" ? circleImage : defaultImage}
          </div>
          <motion.div
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              x: prefersReducedMotion ? 0 : "-5rem",
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
              delay: 0.5,
            }}
            className={cn(
              "relative",
              containerAlignmentClass,
              contentContainerClasses,
            )}
          >
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
            {buttonsCollection ? (
              <div className="flex flex-wrap gap-3">
                {buttonsCollection.items.map((button, index) => {
                  return (
                    <a
                      key={`${button.title}-${index}`}
                      className="mt-5 inline-block rounded-full border-2 border-solid border-darkBlue px-6 py-3 font-bold duration-300 ease-in-out hover:bg-darkBlue hover:text-paleGreen"
                      rel={
                        button.externalLink
                          ? "external nofollow noreferrer"
                          : undefined
                      }
                      href={
                        button.referenceLink
                          ? `/${button.referenceLink.slug}`
                          : button.externalLink
                            ? button.externalLink
                            : undefined
                      }
                      target={button.externalLink ? "_blank" : undefined}
                    >
                      {button.text}
                    </a>
                  )
                })}
              </div>
            ) : null}
          </motion.div>
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
          className="text-primary underline hover:text-lightGreen"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return (
        <p className="mx-auto mb-4 text-base leading-relaxed">{children}</p>
      )
    },
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h1 className="mb-5 text-3xl font-semibold md:text-5xl">{children}</h1>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-2xl font-bold md:text-4xl">{children}</h2>
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
