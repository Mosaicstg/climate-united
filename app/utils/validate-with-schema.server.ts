import { type ZodTypeAny } from "zod"

export function validateWithSchema<T, V>(schema: Zod.Schema<T>, data: V) {
  return schema.parse(data)
}

export function safeValidateWithSchema<Schema extends ZodTypeAny, T>(
  schema: Schema,
  data: T,
) {
  return schema.safeParse(data)
}
