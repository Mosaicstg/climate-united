import { fetchGraphQL } from "~/services/contentful.server";
import { z } from "zod";
import { validateWithSchema } from "~/utils/validate-with-schema";
import { type Document } from "@contentful/rich-text-types";

// query {
//     page(id: "1ydvGd1x8TYHNWeNUbqFeC") {
//         headline
//         bodyText {
//             json
//         }
//         featuredImage {
//             fileName
//             url
//             description
//             width
//             height
//         }
//     }
//     pageCollection(limit: 100) {
//         items {
//             headline
//             bodyText {
//                 json
//             }
//             featuredImage {
//                 fileName
//                 url
//                 description
//                 width
//                 height
//             }
//         }
//     }
// }

export const PageSchema = z.object({
  headline: z.string(),
  bodyText: z.object({
    json: z.object({}),
  }),
  featuredImage: z.object({
    fileName: z.string(),
    url: z.string(),
    description: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

export type Page = z.infer<typeof PageSchema> & {
  bodyText: { json: Document };
};

export async function getPage(id: string): Promise<Page> {
  const query = `
        query {
            page(id: "${id}") {
                headline
                bodyText {
                    json
                }
                featuredImage {
                    fileName
                    url
                    description
                    width
                    height
                }
            }
        }
    `;

  const response = await fetchGraphQL(query);
  const page = response.data.page;

  validateWithSchema(PageSchema, page);

  return page;
}
