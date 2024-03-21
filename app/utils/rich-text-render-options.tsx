import { type Options } from "@contentful/rich-text-react-renderer"
import {
  BLOCKS,
  type Block,
  INLINES,
  type Inline,
} from "@contentful/rich-text-types"
import {
  type AssetLinkSchema,
  type HyperlinkSchema,
  type LinksSchema,
} from "~/schemas/contentful-fields/rich-text.server"
import { type ReactNode } from "react"
import { type z } from "zod"
import { useRouteLoaderData } from "@remix-run/react"
import { type RootLoader } from "~/root"

export const defaultRichTextRenderOptions: Options = {
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
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h3 className="mb-4 text-2xl font-bold dark:text-gray-200">
          {children}
        </h3>
      )
    },
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h4 className="mb-4 text-xl uppercase dark:text-gray-200">
          {children}
        </h4>
      )
    },
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h5 className="mb-4 text-lg font-bold dark:text-gray-200">
          {children}
        </h5>
      )
    },
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: ReactNode) => {
      return (
        <h6 className="text-md mb-4 font-bold uppercase dark:text-gray-200">
          {children}
        </h6>
      )
    },
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: ReactNode) => {
      return <ul className="ml-12 list-disc">{children}</ul>
    },
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: ReactNode) => {
      return <ol className="ml-12 list-decimal">{children}</ol>
    },
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: ReactNode) => {
      return <li>{children}</li>
    },
  },
  renderText: (text: string) => {
    return text
      .split("\n")
      .reduce<Array<ReactNode>>((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
  },
}

export function getRenderRichTextContentOptions({
  renderOptions = defaultRichTextRenderOptions,
  links,
}: {
  renderOptions: Options
  links?: z.infer<typeof LinksSchema>
}): Options {
  const assetMap = new Map<string, z.infer<typeof AssetLinkSchema>>()
  const hyperlinks = new Map<string, z.infer<typeof HyperlinkSchema>>()

  if (links) {
    if (links.assets) {
      for (const asset of links.assets.block) {
        assetMap.set(asset.sys.id, asset)
      }
    }

    if (links.entries) {
      if (links.entries.hyperlink) {
        for (const hyperlink of links.entries.hyperlink) {
          hyperlinks.set(hyperlink.sys.id, hyperlink)
        }
      }
    }
  }

  return {
    renderNode: {
      ...renderOptions.renderNode,
      [INLINES.ENTRY_HYPERLINK]: (
        node: Block | Inline,
        children: ReactNode,
      ) => {
        const { data } = node
        const { target } = data
        const hyperlink = hyperlinks.get(target.sys.id)
        const rootLoaderData = useRouteLoaderData<RootLoader>("root")

        if (!hyperlink) {
          return <>{children}</>
        }

        const { slug, __typename } = hyperlink

        let url = slug

        switch (__typename) {
          case "Post":
            url = `/news/${slug}`
            break
          case "Event":
            url = `/events/${slug}`
            break
          case "CaseStudy":
            url = `/case-study/${slug}`
            break
          case "TeamMember":
            url = `/team/${slug}`
            break
          default:
            url = `/${slug}`
            break
        }

        url = rootLoaderData ? `${rootLoaderData.domainURL}${url}` : url

        return (
          <a className="text-primary underline dark:text-gray-400" href={url}>
            {children}
          </a>
        )
      },
    },
  }
}
