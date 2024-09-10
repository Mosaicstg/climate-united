import { type LandingPage } from "~/models/landing-page.server"
import { HeroSection } from "~/ui/sections/Hero"
import { HeroSplitSection } from "~/ui/sections/HeroSplit"
import { TextMultiImageSplitSection } from "~/ui/sections/TextMultiImageSplit"
import { TextImageSplitSection } from "~/ui/sections/TextImageSplit"
import { SVGMapSection } from "../sections/SVGMap"
import { NewsPressReleasesSection } from "~/ui/sections/NewsPressReleases"
import { EventsResourcesSection } from "~/ui/sections/EventsResources"
import { BucketGridSection } from "~/ui/sections/BucketGrid"
import { StatBucketGridSection } from "~/ui/sections/StatBucketGrid"
import { SocialMediaCtaSection } from "~/ui/sections/SocialMediaCta"
import Header from "~/ui/components/Header"

type LandingPageProps = LandingPage

export function LandingPage({
  headerOptions,
  sectionsCollection,
}: LandingPageProps) {
  return (
    <>
      {headerOptions == "Green Header" ? (
        <Header useGreenHeaderStyle />
      ) : headerOptions == "Transparent Header" ? (
        <Header useTransparentHeaderStyle />
      ) : (
        <Header />
      )}
      <main>
        {sectionsCollection.items.map((section, index) => {
          switch (section.__typename) {
            case "SectionHero":
              return (
                <HeroSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  mainContent={section.mainContent}
                  featuredImage={section.featuredImage}
                />
              )
            case "SectionHeroSplit":
              return (
                <HeroSplitSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  mainContent={section.mainContent}
                  imageAlignment={section.imageAlignment}
                  featuredImage={section.featuredImage}
                />
              )
            case "SectionTextMultiImageSplit":
              return (
                <TextMultiImageSplitSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  mainContent={section.mainContent}
                  featuredImagesCollection={section.featuredImagesCollection}
                />
              )
            case "SectionTextImageSplit":
              return (
                <TextImageSplitSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  mainContent={section.mainContent}
                  imageAlignment={section.imageAlignment}
                  imageShape={section.imageShape}
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
            case "SectionStatBucketGrid":
              return (
                <StatBucketGridSection
                  key={`${section.title}-${index}`}
                  title={section.title}
                  headline={section.headline}
                  mainContent={section.mainContent}
                  statBucketsCollection={section.statBucketsCollection}
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
