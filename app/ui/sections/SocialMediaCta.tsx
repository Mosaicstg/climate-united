import type { SectionSocialMediaCta } from "~/schemas/sections/section.social-media-cta.server"
import { motion, useReducedMotion } from "framer-motion"
import { SocialLink } from "~/ui/components/SocialMediaLink"
import { useContentfulInspectorMode } from "@contentful/live-preview/react"

type SectionSocialMediaCtaProps = SectionSocialMediaCta

export function SocialMediaCtaSection({
  headline,
  socialMediaLinksCollection,
  sys,
}: SectionSocialMediaCtaProps) {
  const prefersReducedMotion = useReducedMotion()

  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <>
      <section className="overflow-hidden bg-lightGreen text-white">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:gap-[7rem] md:px-5">
          <div className="relative my-12">
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
              className="relative md:w-3/4"
            >
              <h2
                className="mb-6 text-3xl font-bold"
                {...inspectorProps({ fieldId: "headline" })}
              >
                {headline}
              </h2>
              <ul className="flex gap-4">
                {socialMediaLinksCollection.items.map((link, index) => {
                  return <SocialLink key={index} {...link} />
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
