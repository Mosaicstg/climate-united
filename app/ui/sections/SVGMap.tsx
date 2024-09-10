import type { SectionTextImage } from "~/schemas/sections/section.text-image.server"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "~/components/ui/dialog"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { RefreshCcw } from "lucide-react"
import { ScrollArea } from "~/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { EPARegionSVGMap } from "~/ui/components/EPARegionSVGMap"
import { type action as epaAction } from "~/routes/action.epa-region"
import { type loader as indexLoader } from "~/routes/_index"
import { cn } from "~/lib/utils"
import { flushSync } from "react-dom"

type SectionTextImageProps = SectionTextImage

const useResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback)

    return () => {
      window.removeEventListener("resize", callback)
    }
  }, [callback])
}

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
      ? U
      : T

export function SVGMapSection({ title }: SectionTextImageProps) {
  const { regions } = useLoaderData<typeof indexLoader>()

  const epaRegionFetcher = useFetcher<typeof epaAction>({
    key: "epa-region",
  })

  const [selectedRegion, setSelectedRegion] = useState<Unpacked<
    typeof regions
  > | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const mapSVGRef = useRef<SVGSVGElement | null>(null)

  const prefersReducedMotion = useReducedMotion()

  const epaRegionDataIsLoading =
    "loading" === epaRegionFetcher.state ||
    "submitting" === epaRegionFetcher.state

  const resizeListener = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsModalOpen(false)
    }
  }, [])

  useResize(resizeListener)

  function handleModalContentSelection(region: string) {
    const formData = new FormData()
    let selectedRegion = region || ""

    if (!selectedRegion) {
      return
    }

    formData.set("region", selectedRegion)

    epaRegionFetcher.submit(formData, {
      action: "/action/epa-region",
      method: "post",
    })

    setSelectedRegion(() => {
      return regions.find((r) => r.slug === selectedRegion) || null
    })

    setIsModalOpen(true)
  }

  function handleRegionSelection(region: string) {
    const formData = new FormData()
    let selectedRegion = region || ""

    if (!selectedRegion) {
      return
    }

    formData.set("region", selectedRegion)

    epaRegionFetcher.submit(formData, {
      action: "action/epa-region",
      method: "post",
    })

    setSelectedRegion(() => {
      return regions.find((r) => r.slug === selectedRegion) || null
    })

    setIsModalOpen(false)
  }

  function onModalOpenChange(open: boolean) {
    // Ensure that we wait till the modal is closed before updating user's focus
    flushSync(() => {
      setIsModalOpen(open)
    })

    if (!open && selectedRegion && mapSVGRef.current) {
      const regionGroupElement = mapSVGRef.current.getElementById(
        selectedRegion.slug,
      ) as SVGGElement

      regionGroupElement?.focus({ preventScroll: true })
    }
  }

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green bg-paleGreen px-6 text-center text-darkBlue md:px-5">
        <div className="mx-auto max-w-screen-xl py-12">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            {title}
          </h2>
          <epaRegionFetcher.Form method="post" action="/action/epa-region">
            <EPARegionSVGMap
              onClick={handleModalContentSelection}
              className="hidden md:block"
              svgRef={mapSVGRef}
            />
            <div className="mt-8 text-left md:hidden">
              <Select
                onValueChange={handleRegionSelection}
                value={selectedRegion?.slug}
              >
                <SelectTrigger
                  className="text-md border-darkBlue focus:ring-green"
                  aria-label="Select an EPA Region"
                >
                  <SelectValue placeholder="Select an EPA region" />
                </SelectTrigger>
                <SelectContent
                  // This is a workaround for mobile device where a user selects an item
                  // and an element underneath the option is clicked/touched.
                  // @see: https://github.com/shadcn-ui/ui/issues/2620#issuecomment-1918404840
                  className="max-w-[--radix-select-trigger-width]"
                  ref={(ref) => {
                    if (!ref) return
                    ref.ontouchstart = (e) => {
                      e.preventDefault()
                    }
                  }}
                >
                  {regions.map((region, index) => (
                    <SelectItem
                      className="text-md max-w-full"
                      key={index}
                      value={region.slug}
                    >
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-5">
                {epaRegionDataIsLoading ? (
                  <p className="mb-2 flex items-center gap-2 text-lg">
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
                          {caseStudy.category ? (
                            <p className="text-sm uppercase">
                              {caseStudy.category}
                            </p>
                          ) : null}
                          <h3 className="text-lg font-bold">
                            <a href={`/case-study/${caseStudy.slug}`}>
                              {caseStudy.title}
                            </a>
                          </h3>
                          {caseStudy.location ? (
                            <p className="text-sm">{caseStudy.location}</p>
                          ) : null}
                        </motion.li>
                      ),
                    )}
                  </ul>
                ) : epaRegionFetcher.data && !epaRegionFetcher.data.success ? (
                  <p className="text-lg">Coming soon.</p>
                ) : null}
              </div>
            </div>
          </epaRegionFetcher.Form>
          <Dialog open={isModalOpen} onOpenChange={onModalOpenChange}>
            <DialogOverlay className="hidden bg-paleGreen/60 md:block" />
            <DialogContent
              className={cn(
                `hidden max-w-2xl border-green bg-white transition-opacity md:block`,
                isModalOpen ? "opacity-100" : "opacity-0",
              )}
            >
              <DialogHeader className="mb-6">
                <DialogTitle>
                  <p className="text-2xl">
                    {selectedRegion
                      ? `${selectedRegion.name} Case Studies`
                      : "EPA Region Case Studies"}
                  </p>
                </DialogTitle>
                {selectedRegion && selectedRegion.description ? (
                  <DialogDescription>
                    {selectedRegion.description}
                  </DialogDescription>
                ) : null}
              </DialogHeader>
              {epaRegionDataIsLoading ? (
                <RefreshCcw className="color-green animate-spin" />
              ) : epaRegionFetcher.data && epaRegionFetcher.data.success ? (
                <ScrollArea className="">
                  <ul className="flex flex-col gap-8 pt-2">
                    {epaRegionFetcher?.data?.data.caseStudies.map(
                      (caseStudy, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between gap-4 pr-2"
                        >
                          <div className="flex flex-col">
                            {caseStudy.category ? (
                              <p className="text-sm uppercase">
                                {caseStudy.category}
                              </p>
                            ) : null}
                            <h3 className="flex-grow text-lg font-bold">
                              {caseStudy.title}
                            </h3>
                            {caseStudy.location ? (
                              <p className="text-sm">{caseStudy.location}</p>
                            ) : null}
                          </div>
                          <div className="">
                            <a
                              href={`/case-study/${caseStudy.slug}`}
                              className="inline-block whitespace-nowrap rounded-full border-2 border-solid border-darkBlue px-6 py-2 font-bold outline-none duration-300 ease-in-out hover:bg-darkBlue hover:text-paleGreen focus:bg-darkBlue focus:text-white focus:ring-2 focus:ring-darkBlue focus:ring-offset-4"
                              aria-label={`Read more about the ${caseStudy.title} case study`}
                            >
                              Read More
                            </a>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </ScrollArea>
              ) : epaRegionFetcher.data && !epaRegionFetcher.data.success ? (
                <p className="text-lg">Coming soon.</p>
              ) : null}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  )
}
