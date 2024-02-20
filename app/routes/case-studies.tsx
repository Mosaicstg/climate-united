import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json } from "@remix-run/node"
import { type MetaFunction, useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import { type RootLoader } from "~/root"
import { invariantResponse } from "~/utils/invariant.server"
import { getSocialMetas } from "~/utils/seo"
import { getCaseStudiesPage } from "~/models/case-studies.server"
import { CaseStudiesPage } from "~/ui/templates/CaseStudiesPage"
import { getCaseStudies } from "~/models/case-study.server"

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
      return <p className="mb-4 text-base leading-relaxed">{children}</p>
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl">{children}</h2>
    },
  },
}

export const loader = async (_: DataFunctionArgs) => {
  const caseStudiesPage = await getCaseStudiesPage("4d7g9VYoTaIuUCuVEJu4U2")

  invariantResponse(caseStudiesPage, "Case Studies page not found.", {
    status: 404,
  })

  const caseStudies = await getCaseStudies()

  return json({ page: caseStudiesPage, caseStudies } as const)
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
            title: `${data.page.seo?.title} - Climate United`,
            url: `${domainURL}${pathname}`,
            description: `${data.page.seo.excerpt}`,
            image: `${data.page.seo.image.url}`,
            keywords: `${data.page.seo?.keywords ? data.page.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function CaseStudies() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <CaseStudiesPage
      title={page.title}
      headline={page.headline}
      mainContent={page.mainContent}
      featuredImage={page.featuredImage}
      seo={page.seo}
    />
  )
}
