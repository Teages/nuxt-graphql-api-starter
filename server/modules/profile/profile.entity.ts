import { nullable, objectType } from 'nexus'
import { UserEntity } from '../user/user.entity'

export const ProfileEntity = objectType({
  name: 'Profile',
  definition(t) {
    // t.nonNull.int('id')
    t.nullable.string('name')
    t.field('owner', {
      type: nullable(UserEntity),
    })
  },
})
