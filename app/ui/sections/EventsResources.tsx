import type { SectionEventsResources } from "~/schemas/sections/section.events-resources.server"
import { Event } from "~/ui/components/Event"
import { Resource } from "~/ui/components/Resource"
import { motion } from "framer-motion"

type SectionEventsResourcesProps = SectionEventsResources

export function EventsResourcesSection({
  title,
  headlineEvents,
  eventsCollection,
  headlineResources,
  resourcesCollection,
  featuredImage,
}: SectionEventsResourcesProps) {
  return (
    <>
      <section className="border-t-4 border-solid border-green">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-6 py-12 md:flex-row md:gap-[12rem] md:px-0">
          <div className="md:w-1/2">
            <h2 className="mb-5 text-3xl font-bold">{headlineEvents}</h2>
            <motion.div
              initial={{ opacity: 0, left: "-5rem" }}
              whileInView={{ opacity: 1, left: "0" }}
              transition={{
                ease: "linear",
                duration: 0.5,
                delay: 0.5,
              }}
              className="relative md:pl-6"
            >
              {eventsCollection.items.map((event, index) => {
                return (
                  <Event
                    key={`${event.slug}-${index}`}
                    title={event.title}
                    slug={event.slug}
                    headline={event.headline}
                    datetime={event.datetime}
                    location={event.location}
                    excerpt={event.excerpt}
                    mainContent={event.mainContent}
                    seo={event.seo}
                  />
                )
              })}
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-5 text-3xl font-bold">{headlineResources}</h2>
            <motion.div
              initial={{ opacity: 0, left: "-5rem" }}
              whileInView={{ opacity: 1, left: "0" }}
              transition={{
                ease: "linear",
                duration: 0.5,
                delay: 0.5,
              }}
              className="relative"
            >
              {resourcesCollection.items.map((resource) => {
                return (
                  <Resource
                    key={resource.title}
                    title={resource.title}
                    file={resource.file}
                  />
                )
              })}
            </motion.div>
            {featuredImage ? (
              <div className="relative mx-auto mt-[5rem] w-[75%]">
                <motion.img
                  initial={{ opacity: 0, transform: "scale(0)" }}
                  whileInView={{ opacity: 1, transform: "scale(1)" }}
                  transition={{
                    ease: "linear",
                    duration: 0.5,
                  }}
                  className="relative z-10 aspect-square w-full rounded-full object-cover"
                  src={featuredImage.url}
                  alt={featuredImage.description || ""}
                  width={featuredImage.width}
                  height={featuredImage.height}
                />
                <motion.div
                  initial={{ opacity: 0, transform: "scale(0)" }}
                  whileInView={{ opacity: 1, transform: "scale(1)" }}
                  transition={{
                    ease: "linear",
                    duration: 0.5,
                    delay: 0.25,
                  }}
                  className="absolute -left-8 -top-8 h-[156px] w-[156px] rounded-full bg-darkBlue"
                ></motion.div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
