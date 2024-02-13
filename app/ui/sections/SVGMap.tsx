import type { SectionTextImage } from "~/schemas/sections/section.text-image.server"
import { useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  Dialog,
  DialogContent,
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
import { type action as epaAction } from "~/routes/action.epa-region"
import { EPARegionSVGMap } from "~/ui/components/EPARegionSVGMap"
import type { loader as indexLoader } from "~/routes/_index"

type SectionTextImageProps = SectionTextImage

const useResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback)

    return () => {
      window.removeEventListener("resize", callback)
    }
  }, [callback])
}

export function SVGMapSection({ title }: SectionTextImageProps) {
  const { regions } = useLoaderData<typeof indexLoader>()
  const epaRegionFetcher = useFetcher<typeof epaAction>({
    key: "epa-region",
  })
  const [selectedRegionName, setSelectedRegionName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleModalContentSelection = (region: string) => {
    const formData = new FormData()
    let selectedRegion = region || ""

    formData.set("region", selectedRegion)

    epaRegionFetcher.submit(formData, {
      action: "action/epa-region",
      method: "post",
    })

    setSelectedRegionName(() => {
      return regions.find((r) => r.slug === selectedRegion)?.name || ""
    })
    setIsModalOpen(true)
  }

  const handleRegionSelection = (region: string) => {
    const formData = new FormData()
    let selectedRegion = region || ""

    formData.set("region", selectedRegion)

    epaRegionFetcher.submit(formData, {
      action: "action/epa-region",
      method: "post",
    })

    setSelectedRegionName(() => {
      return regions.find((r) => r.slug === selectedRegion)?.name || ""
    })
    setIsModalOpen(false)
  }

  const onOpenChange = (open: boolean) => {
    setIsModalOpen(open)
  }

  return (
    <>
      <section className="overflow-hidden border-t-4 border-solid border-green bg-paleGreen px-6 text-center text-darkBlue md:px-5">
        <div className="mx-auto max-w-screen-lg py-12">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
            {title}
          </h2>
          <epaRegionFetcher.Form method="post" action="/action/epa-region">
            <EPARegionSVGMap onClick={handleModalContentSelection} />
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
                    <SelectItem
                      className="text-md"
                      key={index}
                      value={region.slug}
                    >
                      {region.name}
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
                  <p className="mb-10 text-2xl">
                    {selectedRegionName
                      ? `${selectedRegionName}: Case Studies`
                      : "EPA Region Case Studies"}
                  </p>
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
