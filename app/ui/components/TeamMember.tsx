import { type TeamMember } from "~/models/team-member.server"
import {
  domAnimation,
  LazyMotion,
  m,
  motion,
  useReducedMotion,
} from "framer-motion"

type TeamMemberProps = Omit<TeamMember, "seo" | "mainContent"> & {
  borderColor: string
}

export function TeamMember({
  slug,
  name,
  position,
  department,
  featuredImage,
  borderColor = "border-green",
}: TeamMemberProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
        className="text-center"
      >
        {featuredImage ? (
          <img
            className={`${borderColor} relative mx-auto mb-5 aspect-square w-1/2 rounded-full border-4 border-solid object-cover md:w-3/4`}
            src={featuredImage.url}
            alt={featuredImage.description || ""}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
        <div className="relative">
          <p className="font-bold">{name}</p>
          <p className="leading-tight">{position}</p>
          <p className="leading-tight">{department}</p>
          {slug ? (
            <p className="mt-4 leading-tight">
              <a
                className="font-bold uppercase text-green"
                href={`team/${slug}`}
              >
                Read More
              </a>
            </p>
          ) : null}
        </div>
      </m.div>
    </LazyMotion>
  )
}
