import { SectionNewsPressReleases } from "~/schemas/sections/section.news-press-releases.server"
import { Post } from "~/ui/components/Post"

type SectionNewsPressReleasesProps = SectionNewsPressReleases

export function NewsPressReleasesSection({
  title,
  headline,
  postsCollection,
}: SectionNewsPressReleasesProps) {
  return (
    <>
      <section className="border-t-4 border-solid border-green bg-paleGreen text-darkBlue">
        <div className="mx-auto max-w-screen-xl py-12">
          <h2 className="mb-5 text-3xl font-bold">{headline}</h2>
          {postsCollection.items.map((post) => {
            return (
              <Post
                title={post.title}
                headline={post.headline}
                date={post.date}
                excerpt={post.excerpt}
                featuredImage={post.featuredImage}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
