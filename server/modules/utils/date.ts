import { Kind } from 'graphql'
import { scalarType } from 'nexus'

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  parseValue(value) {
    return new Date(value as string)
  },
  serialize(value) {
    return (value as Date).toISOString()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  },
})
