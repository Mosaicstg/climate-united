import { type ActionFunctionArgs, json } from "@remix-run/node"
import { caseStudies, wait } from "~/mocks/epa-regions"
import { z } from "zod"
import { type CaseStudy } from "~/models/case-study.server"
import {
  getEPARegions,
  getCaseStudyByEPARegionSlug,
} from "~/models/epa-region.server"
import { isRouteErrorResponse } from "@remix-run/react"

function getMockCaseStudiesByRegion(region: string) {
  return caseStudies.filter((cs) => cs.region === region)
}

export type EPARegionActionResponse =
  | {
      success: true
      data: {
        caseStudies: Array<CaseStudy>
      }
    }
  | {
      success: false
      error: string
    }

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData()

    const region = formData.get("region")

    if (!region) {
      return json(
        { success: false, error: "No region was selected" },
        { status: 400 },
      )
    }

    const regions = await getEPARegions()

    if (regions.length > 0) {
      const selectedRegion = regions[0]

      if (!selectedRegion) {
        return json(
          { success: false, error: "No region was found" },
          { status: 400 },
        )
      }

      const associatedCaseStudies = await getCaseStudyByEPARegionSlug(
        selectedRegion.slug,
      )

      console.log({ associatedCaseStudies })
    }

    console.log({ regions })

    const result = z.string().safeParse(region)

    if (!result.success) {
      return json({ success: false, error: "Invalid region" }, { status: 400 })
    }

    const { data: selectedRegion } = result

    // The following is used to simulate a slow network request
    // TODO: Remove this once we have real data
    await wait()

    const filteredCaseStudies = getMockCaseStudiesByRegion(selectedRegion)

    return json(
      {
        success: true,
        data: {
          caseStudies: filteredCaseStudies,
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      },
    )
  } catch (error) {
    if (error instanceof Response) {
      const message = await error.text()

      return json({ success: false, error: message }, { status: error.status })
    }

    if (isRouteErrorResponse(error)) {
      return json(
        { success: false, error: error.data },
        { status: error.status },
      )
    }

    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => issue.message)

      console.log({ issues })

      return json(
        { success: false, error: "Invalid form submission" },
        { status: 400 },
      )
    }

    return json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
