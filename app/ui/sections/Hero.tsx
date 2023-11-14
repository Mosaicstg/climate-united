import type { SectionHero } from "~/schemas/sections/section.hero.server"
import type { Block, Inline} from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

type SectionHeroProps = SectionHero

export function HeroSection({
  title,
  mainContent,
  featuredImage,
}: SectionHeroProps) {
  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="overflow-hidden bg-lightGreen text-white">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-12 py-[10rem] md:flex-row">
          <div className="w-1/2">
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </div>
          <div className="relative w-1/2">
            <div className="absolute -right-6 bottom-0 w-[150%] translate-x-[40%] translate-y-[45%]">
              <div className="rounded-full bg-[#52C4A5] p-5">
                <div className="rounded-full bg-[#73CFB7] p-5">
                  <div className="rounded-full bg-[#A8E0D3] p-5">
                    <div className="rounded-full bg-[#D8F0EC] p-5">
                      <img
                        className="w-full rounded-full"
                        src={url}
                        alt={description}
                        width={width}
                        height={height}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const richTextRenderOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { data } = node
      const { uri } = data
      return (
        <a
          className="mt-5 inline-block rounded-full border-2 border-solid border-white px-6 py-3 font-bold duration-300 ease-in-out hover:bg-white hover:text-lightGreen"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return <h1 className="mb-5 text-5xl font-semibold">{children}</h1>
    },
  },
}
