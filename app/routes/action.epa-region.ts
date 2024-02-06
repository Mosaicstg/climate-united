import { type ActionFunctionArgs, json } from "@remix-run/node"
import { caseStudies, wait } from "~/mocks/epa-regions"
import { z } from "zod"
import { type CaseStudy } from "~/models/case-study.server"

function getCaseStudiesByRegion(region: string) {
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
  console.log(request);

  const formData = await request.formData()

  const region = formData.get("region")

  if (!region) {
    return json(
      { success: false, error: "No region was selected" },
      { status: 400 },
    )
  }

  const result = z.string().safeParse(region)

  if (!result.success) {
    return json({ success: false, error: "Invalid region" }, { status: 400 })
  }

  const { data: selectedRegion } = result

  // The following is used to simulate a slow network request
  // TODO: Remove this once we have real data
  await wait()

  const filteredCaseStudies = getCaseStudiesByRegion(selectedRegion)

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
}
