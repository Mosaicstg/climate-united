import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/case-study.$caseStudySlug"
import { type CaseStudy } from "~/models/case-study.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"

type CaseStudyProps = CaseStudy

export function CaseStudy({
  headline,
  partnerLogo,
  category,
  location,
  description,
  mainImage,
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
          ) : null}
          {mainContent ? (
            <div className="mx-auto mt-12 max-w-xl">
              {documentToReactComponents(
                mainContent.json,
                richTextRenderOptions,
              )}
            </div>
          ) : null}
          {ctaText && ctaUrl ? (
            <p className="mt-12 text-lg font-bold">
              <a
                className="text-darkBlue underline"
                href={ctaUrl}
                target="_blank"
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
