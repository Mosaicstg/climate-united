import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types"
import { type DataFunctionArgs, json, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { type ReactNode } from "react"
import {
  getTeamMemberBySlug,
  getTeamMembers,
  TeamMemberSchema,
} from "~/models/team-member.server"
import { TeamMember } from "~/ui/templates/TeamMember"
import { invariantResponse } from "~/utils/invariant.server"
import { GeneralErrorBoundary } from "~/routes/$"
import { Show404 } from "~/ui/templates/404"
import type { RootLoader } from "~/root"
import { getSocialMetas } from "~/utils/seo"
import type { SEOHandle } from "@nasa-gcn/remix-seo"
import { Show500 } from "~/ui/templates/500"

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
  const { memberSlug } = params

  invariantResponse(memberSlug, "Page slug not found.", { status: 404 })

  const member = await getTeamMemberBySlug(memberSlug)
  const response = TeamMemberSchema.safeParse(member)

  invariantResponse(response.success, "Member not found.", { status: 404 })

  return json({ post: response.data })
}

export const handle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const team = await getTeamMembers(100)
    return team.map((post) => ({
      route: `/team/${post.slug}`,
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
            title: `${data.post.seo?.title ? data.post.seo.title : data.post.name} - Team - Climate United`,
            url: `${domainURL}${pathname}`,
            image: `${data.post.seo?.image.url ? data.post.seo.image.url : ""}`,
            description: `${data.post.seo?.excerpt ? data.post.seo?.excerpt : ""}`,
            keywords: `${data.post.seo?.keywords ? data.post.seo.keywords : ""}`,
          }),
        ]
      : []),
  ]
}

export default function Member() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <TeamMember
      slug={post.slug}
      name={post.name}
      position={post.position}
      department={post.department}
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
