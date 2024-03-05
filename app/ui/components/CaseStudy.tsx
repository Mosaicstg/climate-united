import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type CaseStudy } from "~/models/case-study.server"
import {
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from "framer-motion"
import React from "react"

type CaseStudyProps = CaseStudy

export function CaseStudy({
  slug,
  title,
  headline,
  excerpt,
  featuredImage,
}: CaseStudyProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mb-12 flex flex-col gap-12 md:flex-row">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            left: prefersReducedMotion ? "0" : "-5rem",
          }}
          whileInView={{ opacity: 1, left: "0" }}
          viewport={{ once: true }}
          transition={{
            ease: "linear",
            duration: 0.5,
            delay: 0.5,
          }}
          className="relative md:w-2/5"
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
        </m.div>
        <m.div
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            right: prefersReducedMotion ? "0" : "-5rem",
          }}
          whileInView={{ opacity: 1, right: "0" }}
          viewport={{ once: true }}
          transition={{
            ease: "linear",
            duration: 0.5,
            delay: 0.5,
          }}
          className="relative md:w-3/5"
        >
          <h3 className="mb-3 text-xl font-bold text-darkBlue">{headline}</h3>
          {excerpt
            ? documentToReactComponents(excerpt.json, richTextRenderOptions)
            : null}
        </m.div>
      </LazyMotion>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
