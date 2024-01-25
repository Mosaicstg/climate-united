import { fetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "./seo.server"

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
  slug: z.string(),
  headline: z.string(),
  date: z.string(),
  excerpt: RichTextSchema.nullable().optional(),
  mainContent: RichTextSchema,
  featuredImage: ImageSchema.nullable().optional(),
  seo: SEOSchema
})

export const PostsSchema = PostSchema.array()

export type Post = z.infer<typeof PostSchema>

export async function getPostBySlug(slug: string): Promise<Post> {
  const query = `query {
        postCollection(where: { slug: "${slug}" }) {
            items {
                title
                slug
                headline
                date
                excerpt {
                    json
                }
                mainContent {
                    json
                }
                seo {
                  title
                  excerpt
                  image {
                    fileName
                    url
                    description
                    width
                    height
                  }
                  keywords
                }
            }
        }
    }`

  const response = await fetchGraphQL(query)

  return response.data.postCollection.items[0]

  // const post = response.data.postCollection.items[0]
  // return validateWithSchema(PostSchema, post)
}

export async function getPosts(count: number = 10): Promise<Array<Post>> {
  const query = `query {
        postCollection(limit: ${count}) {
            items {
                title
                slug
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
                seo {
                  title
                  excerpt
                  image {
                    fileName
                    url
                    description
                    width
                    height
                  }
                  keywords
                }
            }
        }
    }`

  const response = await fetchGraphQL(query)
  const posts = response.data.postCollection.items

  return validateWithSchema(PostsSchema, posts)
}
