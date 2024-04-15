import { invariantResponse } from "~/utils/invariant.server"

export const contentfulAPIURL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`

/**
 * @throws {Response} If the fetch fails or the response is not valid
 */
export async function typedFetchGraphQL<T>(
  query: string,
  variables = {},
  preview = false,
): Promise<{ data: T } | { data: null; errors: Array<{ message: string }> }> {
  const response = await fetch(contentfulAPIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    console.error(`Error for query: ${query}`, response)
  }

  invariantResponse(response.ok, "Failed to fetch from Contentful API", {
    status: response.status,
    statusText: response.statusText,
  })

  return await response.json()
}
