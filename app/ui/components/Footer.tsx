import { useRouteLoaderData } from "@remix-run/react"
import LogoWhite from "~/ui/components/Logo-White"
import SocialIcon from "~/ui/components/Social-Icon"
import type { loader as RootLoader } from "~/root"
import { NavMenu } from "~/ui/components/NavMenu"
import type { Options } from "@contentful/rich-text-react-renderer"
import {
  defaultRichTextRenderOptions,
  getRenderRichTextContentOptions,
} from "~/utils/rich-text-render-options"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"

const contactInfoRichTextRenderOptions: Options = {
  ...defaultRichTextRenderOptions,
  renderNode: {
    ...defaultRichTextRenderOptions.renderNode,
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="duration-300 ease-in-out hover:text-blue"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
  },
}

const mainContentRichTextRenderOptions: Options = {
  ...defaultRichTextRenderOptions,
  renderNode: {
    ...defaultRichTextRenderOptions.renderNode,
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="underline duration-300 ease-in-out hover:text-blue"
          target="_blank"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
  },
}

export default function Footer() {
  const data = useRouteLoaderData<typeof RootLoader>("root")

  const contactInfoRenderOptions = getRenderRichTextContentOptions({
    renderOptions: contactInfoRichTextRenderOptions,
    links: data?.footerContent?.contactInfo?.links,
  })

  const mainContentRenderOptions = getRenderRichTextContentOptions({
    renderOptions: mainContentRichTextRenderOptions,
    links: data?.footerContent?.mainContent?.links,
  })

  return (
    <footer className="bg-darkBlue text-white">
      <div className="mx-auto max-w-screen-xl px-5 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="font-semibold">
            {data?.footerContent?.contactInfo
              ? documentToReactComponents(
                  data?.footerContent?.contactInfo.json,
                  contactInfoRenderOptions,
                )
              : null}
          </div>
          {data && data.footerMenu ? (
            <nav className="col-span-2">
              <NavMenu
                navMenuClasses=""
                navItemClasses="duration-300 ease-in-out text-white hover:text-blue"
                navItemsCollection={data.footerMenu.navItemsCollection}
              />
            </nav>
          ) : null}
          <div className="col-span-2 text-sm">
            {data?.footerContent?.mainContent
              ? documentToReactComponents(
                  data?.footerContent?.mainContent.json,
                  mainContentRenderOptions,
                )
              : null}
          </div>
          <div className="col-span-2">
            <div className="w-[263px] max-w-full">
              <LogoWhite />
            </div>
          </div>
          <ul className="flex gap-4 self-end md:justify-end">
            {data?.socialMedialLinks?.map((link, index) => {
              return (
                <li key={index}>
                  <a
                    className="block h-[20px] w-[20px] text-white"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only">{link.platform}</span>
                    <SocialIcon icon={link.platform} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
