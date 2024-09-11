import type { SectionAccordions } from "~/schemas/sections/section.accordions.server"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"

type SectionAccordionsProps = SectionAccordions

export function AccordionsSection({
  headline,
  mainContent,
  accordionItemsCollection,
}: SectionAccordionsProps) {
  return (
    <section className="overflow-hidden border-t-4 border-solid border-green text-darkBlue">
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-5">
        <h2 className="mb-5 text-3xl font-bold text-darkBlue">{headline}</h2>
        {mainContent ? (
          <div>
            {documentToReactComponents(mainContent.json, richTextRenderOptions)}
          </div>
        ) : null}
        <Accordion type="multiple" className="mt-10 border-t-2 border-t-green">
          {accordionItemsCollection.items.map((accordionItem, index) => {
            return (
              <AccordionItem
                key={index}
                value={accordionItem.title}
                className="border-b-2 border-b-green py-5 lg:px-10"
              >
                <AccordionTrigger
                  aria-label={`${accordionItem.title}`}
                  className="hover:no-underline"
                >
                  <span className="flex flex-col items-start gap-2 text-darkBlue">
                    <span className="block text-left text-2xl font-bold leading-none">
                      {accordionItem.headline}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-8 md:px-6 md:pb-8 md:pt-6">
                  {documentToReactComponents(
                    accordionItem.mainContent.json,
                    richTextRenderOptions,
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}

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
