import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/case-study.$caseStudySlug"
import { type CaseStudy } from "~/models/case-study.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"

type CaseStudyProps = CaseStudy

export function CaseStudy({
  headline,
  mainContent,
  featuredImage,
}: CaseStudyProps) {
  const prefersReducedMotion = useReducedMotion()

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
              src={featuredImage?.url}
              alt={featuredImage?.description || ""}
              width={featuredImage?.width}
              height={featuredImage?.height}
            />
          </div>
          <h1 className="text-center text-3xl font-bold text-darkBlue">
            {headline}
          </h1>
          {mainContent
            ? documentToReactComponents(mainContent.json, richTextRenderOptions)
            : null}
        </div>
      </main>
    </>
  )
}
