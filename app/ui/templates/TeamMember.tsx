import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextRenderOptions } from "~/routes/team.$memberSlug"
import { type TeamMember } from "~/models/team-member.server"
import Header from "~/ui/components/Header"
import { motion, useReducedMotion } from "framer-motion"

type MemberProps = TeamMember

export function TeamMember({
  name,
  position,
  department,
  mainContent,
  featuredImage,
}: MemberProps) {
  const prefersReducedMotion = useReducedMotion()

  const { url, description, width, height } = featuredImage

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <div className="mx-auto max-w-sm">
            <motion.img
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
              }}
              className="mb-12 aspect-square w-full rounded-full object-cover"
              src={url}
              alt={description || ""}
              width={width}
              height={height}
            />
          </div>
          <h1 className="text-center text-3xl font-bold text-darkBlue">
            {name}
          </h1>
          <p className="text-center text-2xl font-bold text-darkBlue">
            {position}
          </p>
          <p className="mb-5 text-center text-xl font-bold text-darkBlue">
            {department}
          </p>
          {mainContent
            ? documentToReactComponents(mainContent.json, richTextRenderOptions)
            : null}
        </div>
      </main>
    </>
  )
}
