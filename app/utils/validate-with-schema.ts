export function validateWithSchema<T, V>(schema: Zod.Schema<T>, data: V) {
  return schema.parse(data);
}
