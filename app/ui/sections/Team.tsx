import type { SectionTeam } from "~/schemas/sections/section.team.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { TeamMember } from "~/ui/components/TeamMember"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type SectionTeamProps = SectionTeam & { classes: string }

export function TeamSection({
  title,
  headline,
  mainContent,
  teamMembersCollection,
  classes,
}: SectionTeamProps) {
  return (
    <>
      <section className={`w-full ${classes}`}>
        <div className="mx-auto max-w-screen-xl py-12">
          <h2 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h2>
          <div className="max-w-3xl">
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </div>
          <div className="mt-12 grid grid-cols-4 gap-12">
            {teamMembersCollection.items.map((teamMember, index) => {
              let borderColor = "border-green"
              switch (index % 5) {
                case 0:
                  borderColor = "border-green"
                  break
                case 1:
                  borderColor = "border-yellow"
                  break
                case 2:
                  borderColor = "border-lightGreen"
                  break
                case 3:
                  borderColor = "border-blue"
                  break
                case 4:
                  borderColor = "border-darkBlue"
                  break
              }
              return (
                <>
                  <TeamMember
                    name={teamMember.name}
                    position={teamMember.position}
                    department={teamMember.department}
                    featuredImage={teamMember.featuredImage}
                    borderColor={borderColor}
                  />
                </>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="text-primary underline dark:text-gray-400"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
  },
}
