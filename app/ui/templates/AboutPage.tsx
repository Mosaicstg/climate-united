import { type AboutPage } from "~/models/about.server"
import { AboutSection } from "~/ui/sections/About"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"

type AboutPageProps = AboutPage

export function AboutPage({
  featuredImage,
  sectionsCollection,
}: AboutPageProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <Header useGreenHeaderStyle />
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
          <div>
            {sectionsCollection.items.map((section) => {
              return (
                <AboutSection
                  key={section.title}
                  title={section.title}
                  mainContent={section.mainContent}
                  featuredImage={section.featuredImage}
                  imagesCollection={section.imagesCollection}
                />
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
