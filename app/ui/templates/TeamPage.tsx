import { type TeamPage } from "~/models/team.server"
import { TeamSection } from "~/ui/sections/Team"

type TeamPageProps = TeamPage

export function TeamPage({
  title,
  headline,
  featuredImage,
  sectionsCollection,
}: TeamPageProps) {
  return (
    <>
      <div className="mx-auto max-w-screen-xl py-12">
        {featuredImage ? (
          <img
            className="mb-12 aspect-[32/9] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
        <h1 className="-mb-6 text-3xl font-bold text-green">{headline}</h1>
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
              key={section.title}
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
    </>
  )
}
