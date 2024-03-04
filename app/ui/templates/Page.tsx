import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type Page } from "~/models/page.server"
import Header from "~/ui/components/Header"
import {
  domAnimation,
  LazyMotion,
  m,
  motion,
  useReducedMotion,
} from "framer-motion"
import {
  BLOCKS,
  type Block,
  INLINES,
  type Inline,
} from "@contentful/rich-text-types"
import { type ReactNode } from "react"

type PageProps = Page

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
      return <p className="mb-4 text-base leading-relaxed">{children}</p>
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl">{children}</h2>
    },
  },
}

export function Page({
  title,
  headline,
  mainContent,
  featuredImage,
}: PageProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-5">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="relative my-12 md:order-2 md:w-1/3">
              <LazyMotion features={domAnimation}>
                <m.img
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
                <m.div
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
                  className="absolute right-0 top-[-3rem] h-[156px] w-[156px] rounded-full bg-blue"
                ></m.div>
                <m.div
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
                  className="absolute bottom-[-3rem] left-[5rem] h-[156px] w-[156px] rounded-full bg-lightGreen"
                ></m.div>
              </LazyMotion>
            </div>
            <div className="text-darkBlue md:order-1 md:w-2/3">
              <h1 className="mb-5 text-3xl font-bold">{headline}</h1>
              {documentToReactComponents(
                mainContent.json,
                richTextRenderOptions,
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
