import { type AboutPage } from "~/models/about.server"
import { AboutSection } from "~/ui/sections/About"
import { CaseStudy } from "~/ui/components/CaseStudy"
import Header from "~/ui/components/Header"
import { motion } from "framer-motion"

type AboutPageProps = AboutPage

export function AboutPage({
  title,
  featuredImage,
  sectionsCollection,
  caseStudiesHeadline,
  caseStudiesCollection,
}: AboutPageProps) {
  const { url, description, width, height } = featuredImage

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-0">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
                />
              )
            })}
          </div>
        </div>
        <div className="border-t-4 border-solid border-green bg-paleGreen">
          <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-0">
            <h2 className="mb-12 text-3xl font-bold text-darkBlue">
              {caseStudiesHeadline}
            </h2>
            <div>
              {caseStudiesCollection.items.map((caseStudy, index) => {
                return (
                  <CaseStudy
                    key={caseStudy.title}
                    title={caseStudy.title}
                    headline={caseStudy.headline}
                    excerpt={caseStudy.excerpt}
                    featuredImage={caseStudy.featuredImage}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
