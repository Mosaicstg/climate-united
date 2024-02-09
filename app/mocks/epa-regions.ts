import { BLOCKS } from "@contentful/rich-text-types"
import { faker } from "@faker-js/faker"
import { type CaseStudy } from "~/models/case-study.server"

export const regions = [...Array(10)].map((element, index) => {
  return `region-${index}`
})

export const randomRegion = () => {
  return regions[faker.number.int({ min: 0, max: 9 })]
}

export const caseStudies = [...Array(100)].map(() => {
  const caseStudy: CaseStudy & { region?: string } = {
    title: faker.lorem.sentence(),
    headline: faker.lorem.sentence(),
    excerpt: {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [
              {
                nodeType: "text",
                value: faker.lorem.sentence(),
                marks: [],
                data: {},
              },
            ],
            data: {},
          },
        ],
      },
    },
    featuredImage: {
      fileName: faker.system.fileName(),
      url: faker.internet.url(),
      description: faker.lorem.sentence(),
      width: faker.number.int({ min: 100, max: 1000 }),
      height: faker.number.int({ min: 100, max: 1000 }),
    },
    region: regions[faker.number.int({ min: 0, max: 9 })],
  }

  return caseStudy
})

export async function wait() {
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min: 100, max: 1000 })),
  )
}

export function getCaseStudiesByRegion(region: string) {
  return caseStudies.filter((cs) => cs.region === region)
}
