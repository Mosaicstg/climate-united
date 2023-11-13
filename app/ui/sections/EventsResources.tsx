import { SectionEventsResources } from "~/schemas/sections/section.events-resources.server"
import { Event } from "~/ui/components/Event"
import { Resource } from "~/ui/components/Resource"

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
        <div className="mx-auto flex max-w-screen-xl flex-col gap-[12rem] py-12 md:flex-row">
          <div className="md:w-1/2">
            <h2 className="mb-5 text-3xl font-bold">{headlineEvents}</h2>
            <div className="md:pl-6">
              {eventsCollection.items.map((event) => {
                return (
                  <Event
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
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-5 text-3xl font-bold">{headlineResources}</h2>
            {resourcesCollection.items.map((resource) => {
              return <Resource title={resource.title} file={resource.file} />
            })}
            {featuredImage ? (
              <div className="relative mx-auto mt-[5rem] w-[75%]">
                <div className="absolute -left-8 -top-8 h-[156px] w-[156px] rounded-full bg-darkBlue"></div>
                <img
                  className="relative aspect-square w-full rounded-full object-cover"
                  src={featuredImage.url}
                  alt={featuredImage.description}
                  width={featuredImage.width}
                  height={featuredImage.height}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}
