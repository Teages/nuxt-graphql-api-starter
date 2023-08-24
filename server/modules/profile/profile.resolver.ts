import { arg, extendType, inputObjectType, nonNull } from 'nexus'

const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editProfile', {
      type: 'Profile',
      args: {
        input: nonNull(arg({ type: 'EditProfileInput' })),
      },
      resolve: async (_src, args, ctx) => {
        const currentUser = await ctx.db.user.current()
        if (!currentUser) {
          throw new Error('Unauthorized')
        }
        return await ctx.db.profile.update({
          where: {
            ownerId: currentUser.id,
          },
          data: {
            name: args.input.name,
          },
        })
      },
    })
  },
})

const EditProfileInput = inputObjectType({
  name: 'EditProfileInput',
  definition(t) {
    t.nullable.string('name')
  },
})

export const ProfileResolver = [
  Mutation,
  EditProfileInput,
]
