import { type LandingPage } from "~/models/landing-page.server"
import { HeroSection } from "~/ui/sections/Hero"
import { TextMultiImageSplitSection } from "~/ui/sections/TextMultiImageSplit"
import { TextImageSplitSection } from "~/ui/sections/TextImageSplit"
import { SVGMapSection } from "../sections/SVGMap"
import { NewsPressReleasesSection } from "~/ui/sections/NewsPressReleases"
import { EventsResourcesSection } from "~/ui/sections/EventsResources"
import { BucketGridSection } from "~/ui/sections/BucketGrid"
import { SocialMediaCtaSection } from "~/ui/sections/SocialMediaCta"
import Header from "~/ui/components/Header"
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react"

type LandingPageProps = LandingPage

export function LandingPage(landingPage: LandingPageProps) {
  const updatedLandingPage = useContentfulLiveUpdates(landingPage)
  const { sectionsCollection, sys } = updatedLandingPage

  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <>
      <Header
        altLogo={true}
        bgColor={"bg-lightGreen"}
        borderColor={"border-white"}
        linkColor={"text-white hover:text-blue"}
        hamburgerColor={"text-white hover:text-blue focus:text-blue"}
      />
      <main {...inspectorProps({ fieldId: "sections" })}>
        {sectionsCollection.items.map((section, index) => {
          switch (section.__typename) {
            case "SectionHero":
              return (
                <HeroSection key={`${section.title}-${index}`} {...section} />
              )
            case "SectionTextMultiImageSplit":
              return (
                <TextMultiImageSplitSection
                  key={`${section.title}-${index}`}
                  {...section}
                />
              )
            case "SectionTextImageSplit":
              return (
                <TextImageSplitSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  mainContent={section.mainContent}
                  featuredImage={section.featuredImage}
                />
              )
            case "SectionBucketGrid":
              return (
                <BucketGridSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  headline={section.headline}
                  mainContent={section.mainContent}
                  bucketsCollection={section.bucketsCollection}
                />
              )
            case "SectionTextImage":
              return (
                <SVGMapSection
                  key={`${section.title}-${index}}`}
                  title={section.title}
                  mainContent={section.mainContent}
                  featuredImage={section.featuredImage}
                />
              )
            case "SectionEventsResources":
              return (
                <EventsResourcesSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  headlineEvents={section.headlineEvents}
                  eventsCollection={section.eventsCollection}
                  textEvents={section.textEvents}
                  headlineResources={section.headlineResources}
                  resourcesCollection={section.resourcesCollection}
                  featuredImage={section.featuredImage}
                />
              )
            case "SectionSocialMediaCta":
              return (
                <SocialMediaCtaSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  headline={section.headline}
                  socialMediaLinksCollection={
                    section.socialMediaLinksCollection
                  }
                />
              )
            case "SectionNewsPressReleases":
              return (
                <NewsPressReleasesSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  headline={section.headline}
                  postsCollection={section.postsCollection}
                />
              )
            default:
              return null
          }
        })}
      </main>
    </>
  )
}
