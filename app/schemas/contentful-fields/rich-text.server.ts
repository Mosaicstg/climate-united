import {
  BLOCKS,
  INLINES,
  type Inline,
  type Block,
  type TopLevelBlock,
} from "@contentful/rich-text-types"
import { z } from "zod"

export const NodeData = z.record(z.any())

export const NodeSchema = z.object({
  nodeType: z.string().readonly(),
  data: NodeData,
})

export const MarkSchema = z.object({ type: z.string() })

export const TextSchema = NodeSchema.extend({
  nodeType: z.literal("text"),
  value: z.string(),
  marks: MarkSchema.array(),
})

export const InlineSchema: z.ZodType<Inline> = z.lazy(() =>
  NodeSchema.extend({
    nodeType: z.nativeEnum(INLINES),
    content: z.array(z.union([InlineSchema, TextSchema])),
  }),
)

export const BlockSchema: z.ZodType<Block> = z.lazy(() =>
  NodeSchema.extend({
    nodeType: z.nativeEnum(BLOCKS),
    content: z.array(z.union([BlockSchema, InlineSchema, TextSchema])),
  }),
)

export const TopLevelBlockSchema: z.ZodType<TopLevelBlock> = BlockSchema.and(
  z.object({
    nodeType: z.enum([
      BLOCKS.PARAGRAPH,
      BLOCKS.HEADING_1,
      BLOCKS.HEADING_2,
      BLOCKS.HEADING_3,
      BLOCKS.HEADING_4,
      BLOCKS.HEADING_5,
      BLOCKS.HEADING_6,
      BLOCKS.OL_LIST,
      BLOCKS.UL_LIST,
      BLOCKS.HR,
      BLOCKS.QUOTE,
      BLOCKS.EMBEDDED_ENTRY,
      BLOCKS.EMBEDDED_ASSET,
      BLOCKS.EMBEDDED_RESOURCE,
      BLOCKS.TABLE,
    ]),
  }),
)

export const DocumentSchema = NodeSchema.extend({
  nodeType: z.literal(BLOCKS.DOCUMENT),
  content: z.array(TopLevelBlockSchema),
})

export const AssetBlockLinkSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  url: z.string(),
  title: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  description: z.string().nullable(),
  fileName: z.string(),
  contentType: z.string().optional(),
})

export const EntryHyperlinkSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  slug: z.string(),
  __typename: z.string(),
})

export const AssetHyperlinkSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  url: z.string(),
  // The following fields are optional because they won't always be requested
  // in the GraphQL query that fetches the asset.
  title: z.string().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  fileName: z.string().optional(),
})

export const LinksSchema = z.object({
  assets: z
    .object({
      block: AssetBlockLinkSchema.array().optional(),
      hyperlink: AssetHyperlinkSchema.array().optional(),
    })
    .optional(),
  entries: z
    .object({
      hyperlink: EntryHyperlinkSchema.array().optional(),
    })
    .optional(),
})

export const RichTextSchema = z.object({
  json: DocumentSchema,
  links: LinksSchema.optional(),
})

export function createRichTextSchemaWithEmbeddedAssets<T>(schema: z.Schema<T>) {
  return RichTextSchema.and(schema)
}

export type RichText = z.infer<typeof RichTextSchema>
