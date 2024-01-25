import { typedFetchGraphQL } from "~/services/contentful.server"
import { validateWithSchema } from "~/utils/validate-with-schema.server"
import { z } from "zod"
import { RichTextSchema } from "~/schemas/contentful-fields/rich-text.server"
import { ImageSchema } from "~/schemas/contentful-fields/image.server"
import { SEOSchema } from "./seo.server"

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

export async function getPostBySlug(slug: string) {
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

  const response = await typedFetchGraphQL<{ postCollection: { items: Array<Post> } }>(query)

  if (!response.data) {
    console.error(`Error for Post with slug: ${slug}`, response.errors);

    return null;
  }

  const post = response.data.postCollection.items[0]

  return validateWithSchema(PostSchema, post)
}

export async function getPosts(count: number = 10) {
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

  const response = await typedFetchGraphQL<{ postCollection: { items: Array<Post> } }>(query)

  if (!response.data) {
    console.error(`Error for Posts`, response.errors)

    return []
  }

  const posts = response.data.postCollection.items

  return validateWithSchema(PostsSchema, posts)
}
