import type { SectionTeam } from "~/schemas/sections/section.team.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { TeamMember } from "~/ui/components/TeamMember"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { motion, useReducedMotion } from "framer-motion"

type SectionTeamProps = SectionTeam & { classes: string }

export function TeamSection({
  title,
  headline,
  mainContent,
  teamMembersCollection,
  classes,
}: SectionTeamProps) {
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.5,
      },
    },
  }

  const item = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    show: { opacity: 1 },
  }

  return (
    <>
      <section className={`w-full ${classes}`}>
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-0">
          <motion.div
            initial={{ opacity: 0, left: "-5rem" }}
            whileInView={{ opacity: 1, left: "0" }}
            transition={{
              ease: "linear",
              duration: 0.5,
              delay: 0.5,
            }}
            className="relative max-w-3xl"
          >
            <h2 className="mb-5 text-3xl font-bold text-darkBlue">
              {headline}
            </h2>
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-4"
          >
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
                <motion.div variants={item} key={`${teamMember.name}-${index}`}>
                  <TeamMember
                    name={teamMember.name}
                    position={teamMember.position}
                    department={teamMember.department}
                    featuredImage={teamMember.featuredImage}
                    borderColor={borderColor}
                  />
                </motion.div>
              )
            })}
          </motion.div>
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
