import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/about-the-greenhouse-gas-reduction-fund"
import { type Page } from "~/models/page.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"

type PageProps = Page

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
                className="absolute right-0 top-[-3rem] h-[156px] w-[156px] rounded-full bg-blue"
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
                className="absolute bottom-[-3rem] left-[5rem] h-[156px] w-[156px] rounded-full bg-lightGreen"
              ></motion.div>
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
