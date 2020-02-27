import { buildClientSchema, printSchema } from 'graphql'

/**
 * Converts an introspection response to an SDL string
 */
function generateSchemaString (jsonSchema) {
  const graphqlSchemaObj = buildClientSchema(jsonSchema)

  return printSchema(graphqlSchemaObj)
}

export default generateSchemaString
