import type { SectionTextImage } from "~/schemas/sections/section.text-image.server"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Block, Inline } from "@contentful/rich-text-types"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { useState, type ReactNode, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog"
import { useFetcher } from "@remix-run/react"
import { randomRegion, regions } from "~/mocks/epa-regions"
import { RefreshCcw } from "lucide-react"
import { ScrollArea } from "~/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { type EPARegionActionResponse } from "~/routes/action.epa-region"

type SectionTextImageProps = SectionTextImage

const useResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback)

    return () => {
      window.removeEventListener("resize", callback)
    }
  }, [callback])
}

export function SVGMapSection({
  title,
  mainContent,
  featuredImage,
}: SectionTextImageProps) {
  const epaRegionFetcher = useFetcher<EPARegionActionResponse>({
    key: "epa-region",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const epaRegionDataIsLoading =
    "loading" === epaRegionFetcher.state ||
    "submitting" === epaRegionFetcher.state
      ? true
      : false

  const resizeListener = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsModalOpen(false)
    }
  }, [])

  useResize(resizeListener)

  const handleModalContentSelection = () => {
    const formData = new FormData()
    const region = randomRegion() || ""

    formData.set("region", region)

    epaRegionFetcher.submit(formData, {
      action: "action/epa-region",
      method: "post",
    })

    setIsModalOpen(true)
  }

  const handleRegionSelection = (value: string) => {
    const formData = new FormData()

    formData.set("region", value)

    epaRegionFetcher.submit(formData, {
      action: "action/epa-region",
      method: "post",
    })
  }

  const onOpenChange = (open: boolean) => {
    setIsModalOpen(open)
  }

  const { url, description, width, height } = featuredImage

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green bg-paleGreen px-6 text-center text-darkBlue md:px-5">
        <div className="mx-auto max-w-screen-lg py-12">
          <epaRegionFetcher.Form method="post" action="/action/epa-region">
            <motion.img
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
                delay: 0.5,
              }}
              className="mb-12 hidden w-full md:block"
              src={url}
              alt={description || ""}
              width={width}
              height={height}
              onClick={handleModalContentSelection}
            />
            <motion.div
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                bottom: prefersReducedMotion ? "0" : "-5rem",
              }}
              whileInView={{ opacity: 1, bottom: "0" }}
              viewport={{ once: true }}
              transition={{
                ease: "linear",
                duration: 0.5,
                delay: 0.5,
              }}
              className="relative"
            >
              {documentToReactComponents(
                mainContent.json,
                richTextRenderOptions,
              )}
            </motion.div>
            <div className="mt-8 text-left md:hidden">
              <Select onValueChange={handleRegionSelection}>
                <SelectTrigger className="border-darkBlue text-lg focus:ring-green">
                  <SelectValue placeholder="Select an EPA region" />
                </SelectTrigger>
                <SelectContent
                  // This is a workaround for mobile device where a user selects an item
                  // and a element underneath the option is clicked/touched.
                  // @see: https://github.com/shadcn-ui/ui/issues/2620#issuecomment-1918404840
                  ref={(ref) => {
                    if (!ref) return
                    ref.ontouchstart = (e) => {
                      e.preventDefault()
                    }
                  }}
                >
                  {regions.map((region, index) => (
                    <SelectItem className="text-md" key={index} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4">
                {epaRegionDataIsLoading ? (
                  <p className="flex items-center gap-2 text-lg">
                    <span>Loading case studies</span>
                    <RefreshCcw className="color-green animate-spin" />
                  </p>
                ) : epaRegionFetcher.data && epaRegionFetcher.data.success ? (
                  <ul className="flex flex-col gap-6">
                    {epaRegionFetcher.data?.data.caseStudies.map(
                      (caseStudy, index) => (
                        <motion.li
                          transition={{
                            ease: "linear",
                            duration: 0.6,
                            delay: 0.1,
                          }}
                          initial={{
                            opacity: prefersReducedMotion ? 1 : 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          key={index}
                          className="flex-col gap-1"
                        >
                          <h3 className="text-lg font-bold">
                            {caseStudy.title}
                          </h3>
                          <p>Sample, Location U.S.</p>
                        </motion.li>
                      ),
                    )}
                  </ul>
                ) : epaRegionFetcher.data && !epaRegionFetcher.data.success ? (
                  <p className="text-lg">No case studies found</p>
                ) : null}
              </div>
            </div>
          </epaRegionFetcher.Form>
          <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
            <DialogOverlay className="hidden bg-paleGreen/60 md:block" />
            <DialogContent className="hidden max-w-2xl border-green bg-white md:block">
              <DialogHeader>
                <DialogTitle>
                  <p className="mb-10 text-2xl">EPA Case Studies</p>
                </DialogTitle>
              </DialogHeader>
              {epaRegionDataIsLoading ? (
                <RefreshCcw className="color-green animate-spin" />
              ) : epaRegionFetcher.data && epaRegionFetcher.data.success ? (
                <ScrollArea className="h-[350px]">
                  <ul className="flex flex-col gap-8">
                    {epaRegionFetcher?.data?.data.caseStudies.map(
                      (caseStudy, index) => (
                        <li key={index} className="">
                          <h3 className="text-lg font-bold">
                            {caseStudy.title}
                          </h3>
                        </li>
                      ),
                    )}
                  </ul>
                </ScrollArea>
              ) : epaRegionFetcher.data && !epaRegionFetcher.data.success ? (
                <p className="text-lg">No case studies found</p>
              ) : null}
            </DialogContent>
          </Dialog>
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
          className="mt-5 inline-block rounded-full border-2 border-solid border-darkBlue px-6 py-3 font-bold duration-300 ease-in-out hover:bg-darkBlue hover:text-paleGreen"
          rel="noreferrer"
          href={uri}
        >
          {children}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
      return <p className="text-lg">{children}</p>
    },
  },
}
