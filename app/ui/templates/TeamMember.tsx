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
        <article className="mx-auto max-w-screen-lg px-6 py-12 md:px-5">
          <div className="relative mx-auto max-w-[265px]">
            <motion.div
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
              }}
              whileInView={{ opacity: 1, transform: "scale(1)" }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
                delay: 0.25,
              }}
              className="absolute left-[-2rem] top-[3rem] h-[81px] w-[81px] rounded-full bg-green md:left-[-3rem] md:top-[3rem] md:h-[91px] md:w-[91px]"
              aria-hidden="true"
            />
            <motion.div
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
              }}
              whileInView={{ opacity: 1, transform: "scale(1)" }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
                delay: 0.5,
              }}
              className="absolute right-[-2.5rem] top-[30%] h-[110px] w-[110px] rounded-full bg-yellow md:right-[-4rem] md:top-[35%] md:h-[123px] md:w-[123px]"
              aria-hidden="true"
            />
            <picture>
              <source srcSet={`${url}?w=800&fm=avif`} type="image/avif" />
              <source srcSet={`${url}?w=800&fm=webp`} type="image/webp" />
              <source srcSet={`${url}?w=800&fm=png`} type="image/png" />
              <motion.img
                src={url}
                alt={description || ""}
                width={width}
                className="relative mb-8 aspect-square w-full rounded-full object-cover"
                height={height}
                initial={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  transform: prefersReducedMotion ? "scale(1)" : "scale(0)",
                }}
                whileInView={{ opacity: 1, transform: "scale(1)" }}
                viewport={{ once: true }}
                transition={{
                  ease: "linear",
                  duration: 0.5,
                }}
              />
            </picture>
          </div>
          <div className="">
            <h1 className="text-center text-3xl font-bold text-black">
              {name}
            </h1>
            <p className="font text-center text-xl text-black">{position}</p>
            <p className="text-center text-xl text-black">{department}</p>
          </div>
          {mainContent ? (
            <>
              <hr
                aria-hidden="true"
                className="my-5 w-full border-b-4 border-dotted border-b-green md:my-10"
              />
              <div className="md:px-4 lg:px-6">
                {documentToReactComponents(
                  mainContent.json,
                  richTextRenderOptions,
                )}
              </div>
              <hr
                aria-hidden="true"
                className="my-5 w-full border-b-4 border-dotted border-b-green md:my-10"
              />
            </>
          ) : null}
        </article>
      </main>
    </>
  )
}
