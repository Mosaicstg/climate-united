import { useContentfulInspectorMode } from "@contentful/live-preview/react"
import type { SectionNewsPressReleases } from "~/schemas/sections/section.news-press-releases.server"
import { Post } from "~/ui/components/Post"

type SectionNewsPressReleasesProps = SectionNewsPressReleases

export function NewsPressReleasesSection({
  title,
  headline,
  postsCollection,
  sys,
}: SectionNewsPressReleasesProps) {
  const inspectorProps = useContentfulInspectorMode({ entryId: sys.id })

  return (
    <>
      <section className="overflow-hidden bg-paleGreen text-darkBlue">
        <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-5">
          <h2
            className="mb-12 text-3xl font-bold"
            {...inspectorProps({ fieldId: "headline" })}
          >
            {headline}
          </h2>
          {postsCollection.items.map((post) => {
            return <Post key={post.slug} {...post} />
          })}
        </div>
      </section>
    </>
  )
}
