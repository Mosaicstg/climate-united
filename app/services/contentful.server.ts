export function fetchGraphQL(
  query: string,
  variables = {},
  preview = false,
): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
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
    },
  ).then((response) => response.json())
}

export async function typedFetchGraphQL<T>(
  query: string,
  variables = {},
  preview = false,
): Promise<{ data: T } | { data: null; errors: Array<{ message: string }> }> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
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
    },
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch Contentful API: ${response.statusText}`)
  }

  return await response.json()
}
