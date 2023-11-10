export function validateWithSchema<T, V>(schema: Zod.Schema<T>, data: V) {
  return schema.parse(data)
  // TODO: refactor to use below
  // try {
  //   return schema.parse(data)
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     console.error(error.issues)
  //   }
  //   return null
  // }
}

export function safeValidateWithSchema<Schema extends Zod.Schema, Data = any>(
  schema: Schema,
  data: Data,
) {
  return schema.safeParse(data)
}
