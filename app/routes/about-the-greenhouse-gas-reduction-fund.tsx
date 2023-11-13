import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json } from "@remix-run/node"
import { MetaFunction, useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import { getPage } from "~/models/page.server"
import { Page } from "~/ui/templates/Page"
import { invariantResponse } from "~/utils/invariant.server"

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

export const loader = async (_: DataFunctionArgs) => {
  const page = await getPage("1ydvGd1x8TYHNWeNUbqFeC")

  invariantResponse(page, "About page not found.", { status: 404 })

  return json({ page: page })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    ...(data
      ? [
          { title: `${data.page.title} - Climate United` },
          {
            name: "description",
            content: `${data.page.seo.excerpt}`,
          },
          {
            property: "og:image",
            content: `${data.page.seo.image.url}`,
          },
        ]
      : []),
  ]
}

export default function AboutTheGreenhouseGasReductionFund() {
  const { page } = useLoaderData<typeof loader>()

  console.log(page)

  return (
    <Page
      title={page.title}
      headline={page.headline}
      featuredImage={page.featuredImage}
      mainContent={page.mainContent}
      seo={page.seo}
    />
  )
}
