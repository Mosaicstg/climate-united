import { typedFetchGraphQL } from "~/services/contentful.server";
import { z } from "zod";

export const PublishedPagesSchema = z.object({
  pageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
  teamPageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
  caseStudiesCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
  aboutPageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
  landingPageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
      }),
    ),
  }),
});

export type PublishedPages = z.infer<typeof PublishedPagesSchema>;

export const getAllPublishedPagesQuery = `
    query GetAllPublishedPages($limit: Int!) {
        pageCollection(limit: $limit) {
            items {
                slug
            }
        }
        teamPageCollection(limit: $limit) {
            items {
                slug
            }
        }
        caseStudiesCollection(limit: $limit) {
            items {
                slug
            }
        }
        aboutPageCollection(limit: $limit) {
            items {
                slug
            }
        }
        landingPageCollection(limit: $limit) {
            items {
                slug
            }
        }
    }
`;

export async function getAllPublishedPages(limit: number = 100) {
  const response = await typedFetchGraphQL<PublishedPages>(
    getAllPublishedPagesQuery,
    { limit },
  );

  if (!response.data) {
    console.error(`Error for all published pages`, response.errors);

    return [];
  }

  const result = PublishedPagesSchema.safeParse(response.data);

  if (!result.success) {
    console.error(`Error for all published pages`, result.error);
    return [];
  }

  const { data } = result;

  return [
    ...data.pageCollection.items,
    ...data.teamPageCollection.items,
    ...data.caseStudiesCollection.items,
    ...data.aboutPageCollection.items,
    ...data.landingPageCollection.items,
  ];
}

export const ContentBySlugSchema = z.object({
  pageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
        __typename: z.string(),
      }),
    ),
  }),
  teamPageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
        __typename: z.string(),
      }),
    ),
  }),
  caseStudiesCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
        __typename: z.string(),
      }),
    ),
  }),
  aboutPageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
        __typename: z.string(),
      }),
    ),
  }),
  landingPageCollection: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
        __typename: z.string(),
      }),
    ),
  }),
});

export type ContentBySlug = z.infer<typeof ContentBySlugSchema>;

// This is for basic Page, TeamPage, CaseStudies, etc.
export const FindBySlugQuery = `
    query FindBySlug($slug: String!, $preview: Boolean = false) {
        pageCollection(where: {slug: $slug}, limit: 1, preview: $preview) {
            items {
                slug
                __typename
            }
        }
        teamPageCollection(where: {slug: $slug}, limit: 1, preview: $preview)  {
            items {
                slug
                __typename
            }
        }
        caseStudiesCollection(where: {slug: $slug}, limit: 1, preview: $preview) {
            items {
                slug
                __typename
            }
        }
        aboutPageCollection(where: {slug: $slug}, limit: 1, preview: $preview) {
            items {
                slug
                __typename
            }
        }
        landingPageCollection(where: {slug: $slug}, limit: 1, preview: $preview) {
            items {
                slug
                __typename
            }
        }
    }
`;

export async function findContentBySlug(
  slug: string,
  preview: boolean = false,
) {
  const response = await typedFetchGraphQL<ContentBySlug>(FindBySlugQuery, {
    slug,
    preview,
  }, preview);

  if (!response.data) {
    console.error(`Error for page with slug: ${slug}`, response.errors);

    return null;
  }

  const result = ContentBySlugSchema.safeParse(response.data);

  if (!result.success) {
    console.error(`Error for page with slug: ${slug}`, result.error);
    return null;
  }

  const { data } = result;

  const page = data.pageCollection.items[0];
  const teamPage = data.teamPageCollection.items[0];
  const caseStudiesPage = data.caseStudiesCollection.items[0];
  const aboutPage = data.aboutPageCollection.items[0];
  const landingPage = data.landingPageCollection.items[0];

  if (page) {
    return page;
  }

  if (teamPage) {
    return teamPage;
  }

  if (caseStudiesPage) {
    return caseStudiesPage;
  }

  if (aboutPage) {
    return aboutPage;
  }

  if (landingPage) {
    return landingPage;
  }

  return null;
}
