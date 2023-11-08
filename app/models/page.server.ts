import { fetchGraphQL } from "~/services/contentful.server";
import { z } from "zod";
import { validateWithSchema } from "~/utils/validate-with-schema";
import { RichTextSchema } from "~/types";

// query {
//     page(id: "1ydvGd1x8TYHNWeNUbqFeC") {
//         headline
//         mainContent {
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
//             mainContent {
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
  title: z.string(),
  headline: z.string(),
  mainContent: RichTextSchema,
  featuredImage: z.object({
    fileName: z.string(),
    url: z.string(),
    description: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

export type Page = z.infer<typeof PageSchema>;

export async function getPage(id: string): Promise<Page> {
  const query = `
        query {
            page(id: "${id}") {
                title
                headline
                mainContent {
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

  return validateWithSchema(PageSchema, page);
}
