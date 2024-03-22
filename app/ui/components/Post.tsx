import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { type Post } from "~/models/post.server"
import { motion, useReducedMotion } from "framer-motion"

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
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mb-12 flex flex-col gap-12 md:flex-row">
      <motion.div
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          x: prefersReducedMotion ? 0 : "-5rem",
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 0.5,
          delay: 0.5,
        }}
        className="relative md:w-2/5"
      >
        {featuredImage ? (
          <img
            className="aspect-[3/2] w-full rounded-xl object-cover"
            src={featuredImage.url}
            alt={featuredImage.description || ""}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        ) : null}
      </motion.div>
      <motion.div
        initial={{
          opacity: prefersReducedMotion ? 1 : 0,
          x: prefersReducedMotion ? 0 : "5rem",
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 0.5,
          delay: 0.5,
        }}
        className="relative md:w-3/5"
      >
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
          className="mt-5 inline-block rounded-full bg-lightGreen px-4 py-1 font-bold uppercase text-white duration-300 ease-in-out hover:bg-darkBlue"
          href={`/news/${slug}`}
        >
          Read More
        </a>
      </motion.div>
    </div>
  )
}

export const richTextRenderOptions = {
  renderNode: {},
}
