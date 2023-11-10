import { SectionEventsResources } from "~/schemas/sections/section.events-resources.server"

type SectionEventsResourcesProps = SectionEventsResources

export function EventsResourcesSection({
  title,
  headlineEvents,
  eventsCollection,
  headlineResources,
  resourcesCollection,
  featuredImage,
}: SectionEventsResourcesProps) {
  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="border-t-4 border-solid border-green">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 py-12 md:flex-row"></div>
      </section>
    </>
  )
}
