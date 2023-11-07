import { fetchGraphQL } from "~/services/contentful.server";
import { validateWithSchema } from "~/utils/validate-with-schema";
import { z } from "zod";

// query {
//     resourceCollection(limit:100) {
//         items {
//             title
//             file {
//                 fileName
//                 url
//             }
//         }
//     }
// }

// {
//     "data": {
//     "resourceCollection": {
//         "items": [
//             {
//                 "title": "GGRF Fact Sheet | English",
//                 "file": {
//                     "fileName": "Electric cooking.png",
//                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png"
//                 }
//             }
//         ]
//     }
// }
// }

const ResourceSchema = z.object({
  title: z.string(),
  file: z.object({
    fileName: z.string(),
    url: z.string(),
  }),
});

const ResourcesSchema = ResourceSchema.array();

type Resource = z.infer<typeof ResourceSchema>;

export async function getResource(id: string): Promise<Resource> {
  const query = `query {
            resource(id: "${id}") {
                title
                file {
                    fileName
                    url
                }
            }
        }`;

  const response = await fetchGraphQL(query);
  const resource = response.data.resource;

  validateWithSchema(ResourceSchema, resource);

  return resource;
}

export async function getResources(count: number = 10): Promise<Resource[]> {
  const query = `query {
        resourceCollection(limit: ${count}) {
            items {
                title
                file {
                    fileName
                    url
                }
            }
        }
    }`;

  const response = await fetchGraphQL(query);
  const resources = response.data.resourceCollection.items;

  validateWithSchema(ResourcesSchema, resources);

  return resources;
}
