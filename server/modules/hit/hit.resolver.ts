import { extendType, inputObjectType, list } from 'nexus'

const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('hits', {
      type: list('Hit'),
      args: {
        query: 'HitQueryInput',
      },
      resolve: (_src, _args, ctx) => ctx.db.hit.findMany({
        where: {
          owner: {
            uid: _args.query?.ownerUid ?? undefined,
          },
          date: {
            gte: _args.query?.startDate ?? undefined,
            lte: _args.query?.endDate ?? undefined,
          },
        },
        include: {
          owner: {
            include: {
              hits: true,
            },
          },
        },
      }),
    })
  },
})

const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('submitHit', {
      type: 'Hit',
      resolve: async (_src, args, ctx) => {
        const currentUser = await ctx.db.user.current()
        if (!currentUser) {
          throw new Error('Unauthorized')
        }
        return await ctx.db.hit.create({
          data: {
            owner: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        })
      },
    })
  },
})

const HitQueryInput = inputObjectType({
  name: 'HitQueryInput',
  definition(t) {
    t.nullable.string('ownerUid')
    t.nullable.string('startDate')
    t.nullable.string('endDate')
  },
})

export const HitResolver = [
  Query,
  Mutation,
  HitQueryInput,
]
