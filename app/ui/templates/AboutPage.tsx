import { type AboutPage } from "~/models/about.server"
import { AboutSection } from "~/ui/sections/About"
import { CaseStudy } from "~/ui/components/CaseStudy"

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
      <div className="mx-auto max-w-screen-xl py-12">
        <img
          className="mb-12 aspect-[32/9] w-full rounded-xl object-cover"
          src={url}
          alt={description}
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
        <div className="mx-auto max-w-screen-xl py-12">
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
    </>
  )
}
