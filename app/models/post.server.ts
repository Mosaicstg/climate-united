import { fetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema"
import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"

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

export const PostSchema = z.object({
  title: z.string(),
  headline: z.string(),
  date: z.string(),
  excerpt: RichTextSchema.nullable().optional(),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema.optional(),
})

export const PostsSchema = PostSchema.array()

export type Post = z.infer<typeof PostSchema>

export async function getPost(id: string): Promise<Post> {
  const query = `query {
        post(id: "${id}") {
            title
            headline
            date
            excerpt {
                json
            }
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
    }`

  const response = await fetchGraphQL(query)
  const post = response.data.post

  return validateWithSchema(PostSchema, post)
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const query = `query {
        postCollection(where: { slug: "${slug}" }) {
            items {
                title
                headline
                date
                excerpt {
                    json
                }
                mainContent {
                    json
                }
            }
        }
    }`

  const response = await fetchGraphQL(query)
  console.log(response)

  return response.data.postCollection.items[0]

  // const post = response.data.postCollection.items[0]
  // return validateWithSchema(PostSchema, post)
}

export async function getPosts(count: number = 10): Promise<Post[]> {
  const query = `query {
        postCollection(limit: ${count}) {
            items {
                title
                headline
                date
                excerpt {
                    json
                }
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
    }`

  const response = await fetchGraphQL(query)
  const posts = response.data.postCollection.items

  return validateWithSchema(PostsSchema, posts)
}
