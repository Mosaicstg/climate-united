import {
  type ActionFunctionArgs,
  type TypedResponse,
  json,
} from "@remix-run/node"
import { z } from "zod"
import { type CaseStudy } from "~/models/case-study.server"
import { getCaseStudyByEPARegionSlug } from "~/models/epa-region.server"
import { isRouteErrorResponse } from "@remix-run/react"

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

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<TypedResponse<EPARegionActionResponse>> => {
  try {
    const formData = await request.formData()

    const region = formData.get("region") || ""

    if (!region) {
      return json(
        { success: false, error: "No region was selected" },
        { status: 400 },
      )
    }

    const result = z.string().safeParse(region)

    if (!result.success) {
      return json(
        { success: false, error: "Invalid selected region" },
        { status: 400 },
      )
    }

    const { data: selectedRegion } = result

    const filteredCaseStudies =
      await getCaseStudyByEPARegionSlug(selectedRegion)

    if (filteredCaseStudies.length === 0) {
      return json(
        { success: false, error: "No case studies found for selected region" },
        { status: 404 },
      )
    }

    return json(
      {
        success: true,
        data: {
          caseStudies: filteredCaseStudies,
        },
      } as const,
      {
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      },
    )
  } catch (error) {
    if (error instanceof Response) {
      const message = await error.text()

      return json(
        {
          success: false,
          error: message,
        },
        { status: error.status },
      )
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

    console.error("An unexpected error occurred", error)

    return json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 },
    )
  }
}
