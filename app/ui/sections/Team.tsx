import { SectionTeam } from "~/schemas/sections/section.team.server"
import { Block, BLOCKS, Inline, INLINES } from "@contentful/rich-text-types"
import { ReactNode } from "react"
import { TeamMember } from "~/ui/components/TeamMember"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type SectionTeamProps = SectionTeam

export function TeamSection({
  title,
  headline,
  mainContent,
  teamMembersCollection,
}: SectionTeamProps) {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl py-12">
          <h2 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h2>
          <div className="max-w-3xl">
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </div>
          <div className="mt-12 grid grid-cols-4 gap-12">
            {teamMembersCollection.items.map((teamMember) => {
              return (
                <>
                  <TeamMember
                    name={teamMember.name}
                    position={teamMember.position}
                    department={teamMember.department}
                    featuredImage={teamMember.featuredImage}
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
