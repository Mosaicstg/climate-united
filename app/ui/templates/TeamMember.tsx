import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type TeamMember } from "~/models/team-member.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"
import {
  BLOCKS,
  type Block,
  INLINES,
  type Inline,
} from "@contentful/rich-text-types"
import { type ReactNode } from "react"

type MemberProps = TeamMember

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
      return (
        <p className="mb-4 text-base leading-relaxed text-black">{children}</p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h2 className="mb-5 text-3xl font-bold dark:text-gray-200">
          {children}
        </h2>
      )
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h3 className="mb-4 text-2xl font-bold dark:text-gray-200">
          {children}
        </h3>
      )
    },
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h4 className="mb-4 text-xl uppercase dark:text-gray-200">
          {children}
        </h4>
      )
    },
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h5 className="mb-4 text-lg font-bold dark:text-gray-200">
          {children}
        </h5>
      )
    },
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h6 className="text-md mb-4 font-bold uppercase dark:text-gray-200">
          {children}
        </h6>
      )
    },
  },
}

export function TeamMember({
  name,
  position,
  department,
  mainContent,
  featuredImage,
}: MemberProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <Header />
      <main>
        <article className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <div className="relative mx-auto max-w-[265px]">
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
              className="absolute left-[-2rem] top-[3rem] h-[81px] w-[81px] rounded-full bg-green md:left-[-3rem] md:top-[3rem] md:h-[91px] md:w-[91px]"
              aria-hidden="true"
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
                delay: 0.5,
              }}
              className="absolute right-[-2.5rem] top-[30%] h-[110px] w-[110px] rounded-full bg-yellow md:right-[-4rem] md:top-[35%] md:h-[123px] md:w-[123px]"
              aria-hidden="true"
            />
            <picture>
              <source srcSet={`${url}?w=800&fm=avif`} type="image/avif" />
              <source srcSet={`${url}?w=800&fm=webp`} type="image/webp" />
              <source srcSet={`${url}?w=800&fm=png`} type="image/png" />
              <motion.img
                src={url}
                alt={description || ""}
                width={width}
                className="relative mb-8 aspect-square w-full rounded-full object-cover"
                height={height}
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
              />
            </picture>
          </div>
          <div className="">
            <h1 className="text-center text-3xl font-bold text-black">
              {name}
            </h1>
            <p className="font text-center text-xl text-black">{position}</p>
            <p className="text-center text-xl text-black">{department}</p>
          </div>
          {mainContent ? (
            <>
              <hr
                aria-hidden="true"
                className="my-5 w-full border-b-4 border-dotted border-b-green md:my-10"
              />
              <div className="md:px-4 lg:px-6">
                {documentToReactComponents(
                  mainContent.json,
                  richTextRenderOptions,
                )}
              </div>
              <hr
                aria-hidden="true"
                className="my-5 w-full border-b-4 border-dotted border-b-green md:my-10"
              />
            </>
          ) : null}
        </article>
      </main>
    </>
  )
}
