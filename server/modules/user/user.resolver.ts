import { extendType, list, nonNull, nullable, stringArg } from 'nexus'
import { authSigner } from './auth.service'

const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('users', {
      type: nonNull(list(nonNull('User'))),
      resolve: (_src, _args, ctx) => ctx.db.user.findMany({
        include: {
          profile: true,
          hits: true,
        },
      }),
    })

    t.field('user', {
      type: nullable('User'),
      args: {
        uid: nonNull(stringArg()),
      },
      resolve: (_src, args, ctx) => ctx.db.user.findUnique({
        where: {
          uid: args.uid,
        },
        include: {
          profile: true,
          hits: true,
        },
      }),
    })

    t.field('me', {
      type: nullable('User'),
      resolve: (_src, _args, ctx) => ctx.db.user.current(),
    })
  },
})

const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signIn', {
      type: 'User',
      args: {
        uid: nonNull(stringArg()),
      },
      resolve: async (_src, args, ctx) => {
        const ans = await ctx.db.user.findUnique({
          where: {
            uid: args.uid,
          },
          include: {
            profile: true,
            hits: true,
          },
        })
        if (ans) {
          authSigner.signAndWriteCookie({
            userUid: ans.uid,
          }, ctx)
        }
        return ans
      },
    })

    t.field('signUp', {
      type: 'User',
      args: {
        uid: nonNull(stringArg()),
        name: nullable(stringArg()),
      },
      resolve: async (_src, args, ctx) => {
        const ans = await ctx.db.user.create({
          data: {
            uid: args.uid.toLowerCase(),
            profile: {
              create: {
                name: args.name,
              },
            },
          },
          include: {
            profile: true,
            hits: true,
          },
        })
        if (ans) {
          authSigner.signAndWriteCookie({
            userUid: ans.uid,
          }, ctx)
        }
        return ans
      },
    })

    t.field('signOut', {
      type: 'User',
      resolve: async (_src, _args, ctx) => {
        const current = await ctx.db.user.current()
        authSigner.removeCookie(ctx)
        return current
      },
    })
  },
})

export const UserResolver = [
  Query, Mutation,
]
