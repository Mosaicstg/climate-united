import type { CaseStudies } from "~/models/case-studies.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/about-the-greenhouse-gas-reduction-fund"
import { useLoaderData } from "@remix-run/react"
import type { loader } from "~/routes/case-studies"
import React from "react"
import { CaseStudyAccordion } from "~/ui/components/CaseStudy"

type CaseStudiesPageProps = CaseStudies

export function CaseStudiesPage({
  title,
  headline,
  mainContent,
  featuredImage,
  seo,
}: CaseStudiesPageProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  const { caseStudies } = useLoaderData<typeof loader>()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-5">
          <motion.img
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: "linear",
              duration: 0.5,
            }}
            className="mb-12 aspect-[32/9] w-full rounded-xl object-cover"
            src={url}
            alt={description || ""}
            width={width}
            height={height}
          />
          <h2 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h2>
          {mainContent
            ? documentToReactComponents(mainContent.json, richTextRenderOptions)
            : null}
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyAccordion
              key={index}
              title={caseStudy.title}
              slug={caseStudy.slug}
              headline={caseStudy.headline}
              epaRegion={caseStudy.epaRegion}
            />
          ))}
        </div>
      </main>
    </>
  )
}
