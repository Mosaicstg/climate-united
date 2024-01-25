import { invariantResponse } from "~/utils/invariant.server"

export async function typedFetchGraphQL<T>(
  query: string,
  variables = {},
  preview = false,
): Promise<{ data: T } | { data: null; errors: Array<{ message: string }> }> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query, variables }),
    },
  )

  invariantResponse(response.ok, "Failed to fetch from Contentful API", {
    status: response.status,
    statusText: response.statusText,
  })

  return await response.json()
}
