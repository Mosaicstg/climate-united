import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"

export const ButtonSchema = z.object({
  title: z.string(),
  text: z.string(),
  referenceLink: z
    .object({
      __typename: z.string(),
      slug: z.string(),
    })
    .optional()
    .nullable(),
  externalLink: z.string().optional().nullable(),
})

export const ButtonsSchema = ButtonSchema.array()

export type Button = z.infer<typeof ButtonSchema>

export async function getButton(id: string) {
  const query = `query {
      button(id: "${id}") {
          title
          text,
          referenceLink {
            __typename
            ... on AboutPage {
              slug
            }
            ... on Event {
              slug
            }
            ... on LandingPage {
              slug
            }
            ... on Page {
              slug
            }
            ... on Post {
              slug
            }
            ... on TeamMember {
              slug
            }
            ... on TeamPage {
              slug
            }
          }
          externalLink
      }
  }`

  const response = await typedFetchGraphQL<{ button: Button }>(query)

  if (!response.data) {
    console.error(`Error for Button with id:${id}`, response.errors)

    return null
  }

  const bucket = response.data.button

  return validateWithSchema(ButtonSchema, bucket)
}

export async function getButtons(count: number = 10) {
  const query = `query {
    buttonCollection(limit: 100) {
      items {
        title
        text,
        referenceLink {
          __typename
          ... on AboutPage {
            slug
          }
          ... on Event {
            slug
          }
          ... on LandingPage {
            slug
          }
          ... on Page {
            slug
          }
          ... on Post {
            slug
          }
          ... on TeamMember {
            slug
          }
          ... on TeamPage {
            slug
          }
        }
        externalLink
      }
    }
  }`

  const response = await typedFetchGraphQL<{
    buttonCollection: { items: Array<Button> }
  }>(query)

  if (!response.data) {
    console.error(`Error for Buttons`, response.errors)

    return []
  }

  const buckets = response.data.buttonCollection.items

  return validateWithSchema(ButtonsSchema, buckets)
}
