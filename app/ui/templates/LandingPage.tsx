import { type LandingPage } from "~/models/landing-page.server"
import { HeroSection } from "~/ui/sections/Hero"
import { TextMultiImageSplitSection } from "~/ui/sections/TextMultiImageSplit"
import { TextImageSplitSection } from "~/ui/sections/TextImageSplit"
import { TextImageSection } from "~/ui/sections/TextImage"
import { NewsPressReleasesSection } from "~/ui/sections/NewsPressReleases"
import { EventsResourcesSection } from "~/ui/sections/EventsResources"
import { BucketGridSection } from "~/ui/sections/BucketGrid"

type LandingPageProps = LandingPage

export function LandingPage({ title, sectionsCollection }: LandingPageProps) {
  return (
    <>
      {sectionsCollection.items.map((section, index) => {
        switch (section.__typename) {
          case "SectionHero":
            return (
              <HeroSection
                key={`${section.title}-${index}}`}
                title={section.title}
                mainContent={section.mainContent}
                featuredImage={section.featuredImage}
              />
            )
          case "SectionTextMultiImageSplit":
            return (
              <TextMultiImageSplitSection
                key={`${section.title}-${index}}`}
                title={section.title}
                mainContent={section.mainContent}
                featuredImagesCollection={section.featuredImagesCollection}
              />
            )
          case "SectionTextImageSplit":
            return (
              <TextImageSplitSection
                key={`${section.title}-${index}}`}
                title={section.title}
                mainContent={section.mainContent}
                featuredImage={section.featuredImage}
              />
            )
          case "SectionBucketGrid":
            return (
              <BucketGridSection
                key={`${section.title}-${index}}`}
                title={section.title}
                headline={section.headline}
                mainContent={section.mainContent}
                bucketsCollection={section.bucketsCollection}
              />
            )
          case "SectionTextImage":
            return (
              <TextImageSection
                key={`${section.title}-${index}}`}
                title={section.title}
                mainContent={section.mainContent}
                featuredImage={section.featuredImage}
              />
            )
          case "SectionEventsResources":
            return (
              <EventsResourcesSection
                key={`${section.title}-${index}}`}
                title={section.title}
                headlineEvents={section.headlineEvents}
                eventsCollection={section.eventsCollection}
                headlineResources={section.headlineResources}
                resourcesCollection={section.resourcesCollection}
                featuredImage={section.featuredImage}
              />
            )
          case "SectionNewsPressReleases":
            return (
              <NewsPressReleasesSection
                key={`${section.title}-${index}}`}
                title={section.title}
                headline={section.headline}
                postsCollection={section.postsCollection}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
