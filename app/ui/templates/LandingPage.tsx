import { type LandingPage } from "~/models/landing-page.server"
import { HeroSection } from "~/ui/sections/Hero"
import { HeroSplitSection } from "~/ui/sections/HeroSplit"
import { TextImageSplitSection } from "~/ui/sections/TextImageSplit"
import { NewsPressReleasesSection } from "~/ui/sections/NewsPressReleases"
import { StatBucketGridSection } from "~/ui/sections/StatBucketGrid"
import { SocialMediaCtaSection } from "~/ui/sections/SocialMediaCta"
import { AboutSection } from "~/ui/sections/About"
import { AccordionsSection } from "~/ui/sections/Accordions"
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
            case "SectionAbout":
              return (
                <AboutSection
                  key={section.title}
                  title={section.title}
                  mainContent={section.mainContent}
                  featuredImage={section.featuredImage}
                  imagesCollection={section.imagesCollection}
                />
              )
            case "SectionAccordions":
              return (
                <AccordionsSection
                  key={section.title}
                  title={section.title}
                  headline={section.headline}
                  mainContent={section.mainContent}
                  accordionItemsCollection={section.accordionItemsCollection}
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
