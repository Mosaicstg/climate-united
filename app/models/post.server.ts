import { fetchGraphQL } from "~/services/contentful.server";
import { validateWithSchema } from "~/utils/validate-with-schema";
import { z } from "zod";
import { type Document } from "@contentful/rich-text-types";

// query {
//     postCollection(limit: 100) {
//         items {
//             headline
//             date
//             excerpt {
//                 json
//             }
//             content {
//                 json
//             }
//             image {
//                 fileName
//                 url
//                 description
//                 width
//                 height
//             }
//         }
//     }
// }

// {
//     "data": {
//     "postCollection": {
//         "items": [
//             {
//                 "headline": "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
//                 "date": "2023-12-01T00:00:00.000-05:00",
//                 "excerpt": {
//                     "json": {
//                         "data": {},
//                         "content": [
//                             {
//                                 "data": {},
//                                 "content": [
//                                     {
//                                         "data": {},
//                                         "marks": [],
//                                         "value": "Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur. Lorem ipsum dolor sit amet consectetur. Dignissim tristique et nisi ullamcorper. Dictum ullamcorper tempor non senectus scelerisque consectetur.",
//                                         "nodeType": "text"
//                                     }
//                                 ],
//                                 "nodeType": "paragraph"
//                             }
//                         ],
//                         "nodeType": "document"
//                     }
//                 },
//                 "content": {
//                     "json": {
//                         "nodeType": "document",
//                         "data": {},
//                         "content": [
//                             {
//                                 "nodeType": "paragraph",
//                                 "data": {},
//                                 "content": [
//                                     {
//                                         "nodeType": "text",
//                                         "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem pretium, dapibus odio pulvinar, hendrerit tellus. Suspendisse neque orci, aliquet a malesuada sit amet, ornare et velit. Nullam turpis urna, blandit ut nunc vel, aliquet dapibus diam. Sed at elementum arcu. Etiam pharetra ipsum quis tortor dapibus mattis. Ut ornare dapibus massa sed molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis dui sed nisl accumsan, in iaculis nulla accumsan.",
//                                         "marks": [],
//                                         "data": {}
//                                     }
//                                 ]
//                             },
//                             {
//                                 "nodeType": "paragraph",
//                                 "data": {},
//                                 "content": [
//                                     {
//                                         "nodeType": "text",
//                                         "value": "Cras porta mauris at quam aliquam, nec iaculis ante suscipit. Vestibulum sollicitudin suscipit maximus. Vestibulum dapibus pharetra neque, ut porta lectus placerat efficitur. Nulla non condimentum mauris. Ut tempus lectus tincidunt erat hendrerit bibendum. Praesent fringilla ut felis a tristique. Sed et porttitor odio, quis elementum augue. Nullam at lacus vitae est laoreet cursus ut in nibh. Nullam posuere consectetur tellus nec aliquet. Vestibulum pulvinar venenatis urna nec aliquam. Donec iaculis ut mauris dapibus vehicula. Nulla sodales venenatis orci, eget scelerisque nibh ullamcorper at.",
//                                         "marks": [],
//                                         "data": {}
//                                     }
//                                 ]
//                             },
//                             {
//                                 "nodeType": "paragraph",
//                                 "data": {},
//                                 "content": [
//                                     {
//                                         "nodeType": "text",
//                                         "value": "Maecenas eget lectus eros. Aenean auctor mauris sit amet ante consectetur dictum. Donec ut consectetur augue. Sed tincidunt venenatis purus eget dictum. Integer eu dui ex. Proin lacinia semper ipsum nec euismod. Suspendisse ac vulputate arcu.",
//                                         "marks": [],
//                                         "data": {}
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 },
//                 "image": {
//                     "fileName": "Electric cooking.png",
//                     "url": "https://images.ctfassets.net/urgx2rpiyypc/1TfWT4CCQK8lHE2FB95D0h/56f4543955afd7fe7a25e789369f8267/Electric_cooking.png",
//                     "description": "Stir Fry. Yum!",
//                     "width": 577,
//                     "height": 603
//                 }
//             }
//         ]
//     }
// }
// }

export const PostSchema = z.object({
  headline: z.string(),
  date: z.string().datetime({ offset: true }),
  excerpt: z.object({
    json: z.object({}),
  }),
  content: z.object({
    json: z.object({}),
  }),
  image: z.object({
    fileName: z.string(),
    url: z.string(),
    description: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

export const PostsSchema = PostSchema.array();

export type Post = z.infer<typeof PostSchema> & {
  excerpt: { json: Document };
  content: { json: Document };
};

export async function getPost(id: string): Promise<Post> {
  const query = `query {
        post(id: "${id}") {
            headline
            date
            excerpt {
                json
            }
            content {
                json
            }
            image {
                 fileName
                 url
                 description
                 width
                 height
            }
        }
    }`;

  const response = await fetchGraphQL(query);
  const post = response.data.post;

  validateWithSchema(PostSchema, post);

  return post;
}

export async function getPosts(count: number = 10): Promise<Post[]> {
  const query = `query {
        postCollection(limit: ${count}) {
            items {
                headline
                date
                excerpt {
                    json
                }
                content {
                    json
                }
                image {
                     fileName
                     url
                     description
                     width
                     height
                }
            }
        }
    }`;

  const response = await fetchGraphQL(query);
  const posts = response.data.postCollection.items;

  validateWithSchema(PostsSchema, posts);

  return posts;
}
