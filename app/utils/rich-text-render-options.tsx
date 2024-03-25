import { type Options } from "@contentful/rich-text-react-renderer"
import {
  BLOCKS,
  type Block,
  INLINES,
  type Inline,
} from "@contentful/rich-text-types"
import {
  type AssetHyperlinkSchema,
  type AssetBlockLinkSchema,
  type EntryHyperlinkSchema,
  type LinksSchema,
} from "~/schemas/contentful-fields/rich-text.server"
import { type ReactNode } from "react"
import { type z } from "zod"
import { useRouteLoaderData } from "@remix-run/react"
import { type RootLoader } from "~/root"
import { motion } from "framer-motion"

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
    [BLOCKS.PARAGRAPH]: (_: Block | Inline, children: ReactNode) => {
      return <p className="mb-4 text-base leading-relaxed">{children}</p>
    },
    [BLOCKS.HEADING_2]: (_: Block | Inline, children: ReactNode) => {
      return <h2 className="mb-5 text-3xl">{children}</h2>
    },
    [BLOCKS.HEADING_3]: (_: Block | Inline, children: ReactNode) => {
      return (
        <h3 className="mb-4 text-2xl font-bold dark:text-gray-200">
          {children}
        </h3>
      )
    },
    [BLOCKS.HEADING_4]: (_: Block | Inline, children: ReactNode) => {
      return (
        <h4 className="mb-4 text-xl uppercase dark:text-gray-200">
          {children}
        </h4>
      )
    },
    [BLOCKS.HEADING_5]: (_: Block | Inline, children: ReactNode) => {
      return (
        <h5 className="mb-4 text-lg font-bold dark:text-gray-200">
          {children}
        </h5>
      )
    },
    [BLOCKS.HEADING_6]: (_: Block | Inline, children: ReactNode) => {
      return (
        <h6 className="text-md mb-4 font-bold uppercase dark:text-gray-200">
          {children}
        </h6>
      )
    },
    [BLOCKS.UL_LIST]: (_: Block | Inline, children: ReactNode) => {
      return <ul className="ml-12 list-disc">{children}</ul>
    },
    [BLOCKS.OL_LIST]: (_: Block | Inline, children: ReactNode) => {
      return <ol className="ml-12 list-decimal">{children}</ol>
    },
    [BLOCKS.LIST_ITEM]: (_: Block | Inline, children: ReactNode) => {
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
  const assetBlocks = new Map<string, z.infer<typeof AssetBlockLinkSchema>>()
  const assetLinks = new Map<string, z.infer<typeof AssetHyperlinkSchema>>()
  const entryHyperlinks = new Map<
    string,
    z.infer<typeof EntryHyperlinkSchema>
  >()

  if (links) {
    if (links.assets) {
      // Handle assets that have been "embedded" in the rich text field
      // A "block" in contentful is when you see a UI "block" element in the rich text editor
      if (links.assets.block) {
        for (const asset of links.assets.block) {
          assetBlocks.set(asset.sys.id, asset)
        }
      }

      if (links.assets.hyperlink) {
        for (const asset of links.assets.hyperlink) {
          assetLinks.set(asset.sys.id, asset)
        }
      }
    }

    if (links.entries) {
      // Handle entries that have been linked to in the rich text field
      if (links.entries.hyperlink) {
        for (const hyperlink of links.entries.hyperlink) {
          entryHyperlinks.set(hyperlink.sys.id, hyperlink)
        }
      }
    }
  }

  return {
    ...renderOptions,
    renderNode: {
      ...renderOptions.renderNode,
      [INLINES.ENTRY_HYPERLINK]: (
        node: Block | Inline,
        children: ReactNode,
      ) => {
        const { data } = node
        const { target } = data
        const hyperlink = entryHyperlinks.get(target.sys.id)

        if (!hyperlink) {
          return <>{children}</>
        }

        const rootLoaderData = useRouteLoaderData<RootLoader>("root")

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
      [INLINES.ASSET_HYPERLINK]: (
        node: Block | Inline,
        children: ReactNode,
      ) => {
        const { data } = node
        const { target } = data
        const assetLink = assetLinks.get(target.sys.id)

        if (!assetLink) {
          return <>{children}</>
        }

        const { url } = assetLink

        return (
          <a
            className="text-primary underline dark:text-gray-400"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </a>
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const { data } = node
        const { target } = data
        const asset = assetBlocks.get(target.sys.id)

        if (!asset) {
          return null
        }

        const { title, description, url, width, height, contentType } = asset

        if (
          contentType !== "image/png" &&
          contentType !== "image/jpeg" &&
          contentType !== "image/webp" &&
          contentType !== "image/avif"
        ) {
          return (
            <p className="mb-4 text-base leading-relaxed">
              <a
                className="text-primary underline dark:text-gray-400"
                target="_blank"
                rel="noreferrer"
                href={url}
              >
                {title}
              </a>
            </p>
          )
        }

        return (
          <div className="my-6 w-full overflow-hidden rounded-xl bg-slate-100">
            <figure>
              <picture className="overflow-hidden">
                <source type="image/avif" srcSet={`${url}?fm=avif&w=2000`} />
                <source type="image/webp" srcSet={`${url}?fm=webp&w=2000`} />
                <source type="image/webp" srcSet={`${url}?fm=png&w=2000`} />
                <motion.img
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  src={url}
                  alt={title}
                  className="w-full overflow-hidden"
                  width={width || undefined}
                  height={height || undefined}
                  loading="lazy"
                />
              </picture>
              {description ? (
                <figcaption className="bg-gray-150 p-4 text-left text-sm dark:bg-gray-800">
                  {description}
                </figcaption>
              ) : null}
            </figure>
          </div>
        )
      },
    },
  }
}
