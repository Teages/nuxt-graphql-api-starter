import { nullable, objectType } from 'nexus'
import { UserEntity } from '../user/user.entity'

export const HitEntity = objectType({
  name: 'Hit',
  definition(t) {
    // t.nonNull.int('id')
    t.nonNull.date('date')
    t.field('owner', {
      type: nullable(UserEntity),
    })
  },
})
