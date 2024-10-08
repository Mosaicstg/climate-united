import type { SectionNewsPressReleases } from "~/schemas/sections/section.news-press-releases.server"
import { Post } from "~/ui/components/Post"

type SectionNewsPressReleasesProps = SectionNewsPressReleases

export function NewsPressReleasesSection({
  title,
  headline,
  postsCollection,
}: SectionNewsPressReleasesProps) {
  return (
    <>
      <section className="overflow-hidden bg-paleGreen text-darkBlue">
        <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-5 xl:max-w-screen-xl">
          <h2 className="mb-12 text-3xl font-bold">{headline}</h2>
          {postsCollection.items.map((post) => {
            return (
              <Post
                key={post.slug}
                title={post.title}
                slug={post.slug}
                headline={post.headline}
                date={post.date}
                excerpt={post.excerpt}
                mainContent={post.mainContent}
                featuredImage={post.featuredImage}
                seo={post.seo}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
