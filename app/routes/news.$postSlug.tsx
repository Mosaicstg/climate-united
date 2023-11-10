import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import { getPostBySlug, PostSchema } from "~/models/post.server"
import { Post } from "~/ui/templates/Post"
import { invariantResponse } from "~/utils/invariant.server"
import { GeneralErrorBoundary } from "~/routes/$"
import { Show404 } from "~/ui/templates/404"

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
        <p className="mb-4 text-base leading-relaxed text-black">{children}</p>
      )
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl dark:text-gray-200">{children}</h2>
    },
  },
}

export const loader = async ({ params }: DataFunctionArgs) => {
  const { postSlug } = params

  invariantResponse(postSlug, "Post slug not found.", { status: 404 })

  const post = await getPostBySlug(postSlug)
  const response = PostSchema.safeParse(post)

  invariantResponse(response.success, "Post not found.", { status: 404 })

  return json({ post: response.data })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...(data ? [{ title: `${data.post.title} - News - Climate United` }] : []),
  ]
}

export default function NewsPost() {
  const { post } = useLoaderData<typeof loader>()
  console.log(post)

  return (
    <Post
      title={post.title}
      headline={post.headline}
      date={post.date}
      mainContent={post.mainContent}
    />
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <Show404 />,
      }}
    />
  )
}
