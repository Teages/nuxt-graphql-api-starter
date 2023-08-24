import { list, nonNull, nullable, objectType } from 'nexus'
import { ProfileEntity } from '../profile/profile.entity'
import { HitEntity } from '../hit/hit.entity'

export const UserEntity = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('uid')
    t.field('profile', {
      type: nullable(ProfileEntity),
    })
    t.field('hits', {
      type: nonNull(list(nonNull(HitEntity))),
    })
  },
})
