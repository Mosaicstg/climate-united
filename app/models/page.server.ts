import { fetchGraphQL } from "~/services/contentful.server";

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

type Page = {
  headline: string;
  bodyText: {
    json: any;
  };
  featuredImage: {
    fileName: string;
    url: string;
    description: string;
    width: number;
    height: number;
  };
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

  return response.data.page;
}
