import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import { getPost } from "~/models/post.server"
import { Post } from "~/templates/Post"

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="text-primary underline dark:text-gray-400"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return (
        <p className="mb-4 text-base leading-relaxed text-black">
          {children}
        </p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl dark:text-gray-200">{children}</h2>
    },
  },
}

export const loader = async (_: DataFunctionArgs) => {
  const samplePost = await getPost("3wBJEIxJkD728XAHtPFKdo")

  return json({ post: samplePost })
}

export default function SamplePost() {
  const { post } = useLoaderData<typeof loader>()

  console.log(post)

  return (
      <Post
        title={post.title}
        headline={post.headline}
        date={post.date}
        excerpt={post.excerpt}
        mainContent={post.mainContent}
        featuredImage={post.featuredImage}
      />
  )
}
