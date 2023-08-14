import { objectType } from 'nexus'

export const UserEntity = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('email')
    t.nullable.string('name')
  },
})
