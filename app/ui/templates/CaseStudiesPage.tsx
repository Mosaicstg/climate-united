import type { CaseStudies } from "~/models/case-studies.server"
import Header from "~/ui/components/Header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { motion, useReducedMotion } from "framer-motion"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/about-the-greenhouse-gas-reduction-fund"
import { useLoaderData } from "@remix-run/react"
import type { loader } from "~/routes/case-studies"

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

  const { epaRegionsWithCaseStudies } = useLoaderData<typeof loader>()

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
          <h1 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h1>
          {mainContent ? (
            <div className="">
              {documentToReactComponents(
                mainContent.json,
                richTextRenderOptions,
              )}
            </div>
          ) : null}
          <Accordion
            type="multiple"
            className="mt-10 border-t-2 border-t-green"
          >
            {epaRegionsWithCaseStudies.map((epaRegion) => {
              const {
                slug,
                name,
                description,
                linkedFrom: {
                  caseStudyCollection: { items: caseStudies },
                },
              } = epaRegion
              return (
                <AccordionItem
                  key={slug}
                  value={slug}
                  className="border-b-2 border-b-green py-5 lg:px-10"
                >
                  <AccordionTrigger
                    aria-label={name}
                    className="hover:no-underline"
                  >
                    <span className="flex flex-col items-start gap-2 text-darkBlue">
                      <span className="block text-2xl font-bold leading-none">
                        {name}
                      </span>
                      <span className="text-md block">{description}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-8 md:px-6 md:pb-8 md:pt-6">
                    {caseStudies.map((caseStudy, index) => (
                      <div
                        className="flex justify-between gap-4 text-darkBlue lg:gap-8"
                        key={index}
                      >
                        <div className="max-w-lg">
                          {caseStudy.category ? (
                            <p className="uppercase">{caseStudy.category}</p>
                          ) : null}
                          <h4 className="text-xl font-bold">
                            {caseStudy.headline}
                          </h4>
                          {caseStudy.location ? (
                            <p className="">{caseStudy.location}</p>
                          ) : null}
                          {caseStudy.excerpt ? (
                            <div className="text-md mt-4">
                              {documentToReactComponents(
                                caseStudy.excerpt.json,
                                richTextRenderOptions,
                              )}
                            </div>
                          ) : null}
                        </div>
                        <div className="pt-4">
                          <a
                            href={`/case-study/${caseStudy.slug}`}
                            className="rounded-full border-2 border-darkBlue px-4 py-2 font-bold text-darkBlue transition-colors duration-300 ease-in-out hover:bg-darkBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-offset-2"
                            aria-label={`Read more about ${caseStudy.title} case study`}
                          >
                            Read more
                          </a>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </main>
    </>
  )
}
