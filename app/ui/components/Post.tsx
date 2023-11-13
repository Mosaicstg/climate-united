import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type Post } from "~/models/post.server"

type PostProps = Post

export function Post({
  title,
  slug,
  headline,
  date,
  excerpt,
  mainContent,
  featuredImage,
}: PostProps) {
  return (
    <div className="mb-12 flex flex-col gap-12 md:flex-row">
      <div className="md:w-2/5">
        {featuredImage ? (
          <img
            className="aspect-[3/2] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
      </div>
      <div className="md:w-3/5">
        <h3 className="mb-3 text-xl font-bold">
          <a
            className="text-darkBlue duration-300 ease-in-out hover:text-green"
            href={`/news/${slug}`}
          >
            {headline}
          </a>
        </h3>
        {excerpt
          ? documentToReactComponents(excerpt.json, richTextRenderOptions)
          : null}
        <a
          className="mt-5 inline-block rounded-full bg-green px-4 py-1 font-bold uppercase text-white duration-300 ease-in-out hover:bg-darkBlue"
          href={`/news/${slug}`}
        >
          Read More
        </a>
      </div>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
