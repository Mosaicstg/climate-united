import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import { getCaseStudies, getCaseStudyBySlug } from "~/models/case-study.server"
import { CaseStudy } from "~/ui/templates/CaseStudy"
import { invariantResponse } from "~/utils/invariant.server"
import { GeneralErrorBoundary } from "~/routes/$"
import { Show404 } from "~/ui/templates/404"
import type { RootLoader } from "~/root"
import { getSocialMetas } from "~/utils/seo"
import type { SEOHandle } from "@nasa-gcn/remix-seo"
import { Show500 } from "~/ui/templates/500"
import { z } from "zod"

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
  const { caseStudySlug } = params

  invariantResponse(caseStudySlug, "Page slug not found.", { status: 404 })

  try {
    const study = await getCaseStudyBySlug(caseStudySlug)

    invariantResponse(study, "Case Study not found.", { status: 404 })

    return json({ post: study })
  } catch (error) {
    // Log this on the server
    console.error(error)

    if (error instanceof Response) {
      const message = await error.text()

      throw new Response(message, { status: 404 })
    }

    if (error instanceof z.ZodError) {
      const errors = error.issues.map((error) => error.message)
      const errorMessage = errors.join(", ")

      throw new Response(errorMessage, { status: 404 })
    }

    throw new Response("Something went wrong!", { status: 500 })
  }
}

export const handle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const studies = await getCaseStudies(100)
    return studies.map((post) => ({
      route: `/case-study/${post.slug}`,
      priority: 0.7,
    }))
  },
}

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  data,
  matches,
  location,
}) => {
  const domainURL = matches.find((match) => match.id === "root")?.data.domainURL
  const { pathname } = location

  return [
    ...(data
      ? [
          ...getSocialMetas({
            title: `${data.post.seo?.title ? data.post.seo.title : data.post.title} - Case Studies - Climate United`,
            url: `${domainURL}${pathname}`,
            image: `${data.post.seo?.image.url ? data.post.seo.image.url : ""}`,
            description: `${data.post.seo?.excerpt ? data.post.seo?.excerpt : ""}`,
            keywords: `${data.post.seo?.keywords ? data.post.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function Study() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <CaseStudy
      slug={post.slug}
      title={post.title}
      headline={post.headline}
      mainContent={post.mainContent}
      featuredImage={post.featuredImage}
      seo={post.seo}
    />
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <Show404 />,
        500: () => <Show500 />,
      }}
    />
  )
}
