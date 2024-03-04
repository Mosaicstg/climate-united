import { type TeamPage } from "~/models/team.server"
import { TeamSection } from "~/ui/sections/Team"
import Header from "~/ui/components/Header"
import {
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from "framer-motion"

type TeamPageProps = TeamPage

export function TeamPage({
  title,
  headline,
  featuredImage,
  sectionsCollection,
}: TeamPageProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-5">
          {featuredImage ? (
            <LazyMotion features={domAnimation}>
              <m.img
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  ease: "linear",
                  duration: 0.5,
                }}
                className="aspect-[32/9] w-full rounded-xl object-cover"
                src={featuredImage.url}
                alt={featuredImage.description || ""}
                width={featuredImage.width}
                height={featuredImage.height}
              />
            </LazyMotion>
          ) : null}
          {headline ? (
            <h1 className="-mb-6 mt-12 text-3xl font-bold text-darkBlue">
              {headline}
            </h1>
          ) : null}
        </div>
        <div>
          {sectionsCollection.items.map((section, index) => {
            let classes = ""
            switch (index % 2) {
              case 1:
                classes = "bg-paleGreen border-t-4 border-solid border-green"
                break
            }
            return (
              <TeamSection
                key={`${section.title}-${index}`}
                title={section.title}
                headline={section.headline}
                mainContent={section.mainContent}
                featuredImage={section.featuredImage}
                teamMembersCollection={section.teamMembersCollection}
                classes={classes}
              />
            )
          })}
        </div>
      </main>
    </>
  )
}
