import type { IncomingMessage } from 'node:http'
import { PrismaClient } from '@prisma/client'
import type { RequestContext } from 'graphql-http/lib/use/http'
import type { Request, RequestParams } from 'graphql-http/lib'
import { authSigner } from './user/auth.service'

// keep only one instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient
}
// client with global extend
const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export function buildContext(
  req: Request<IncomingMessage, RequestContext>,
  params: RequestParams,
) {
  return {
    db: prisma.$extends({
      name: 'currentUser',
      model: {
        user: {
          current: async () => {
            const cookies = (req.headers as any).cookie ?? '' as string
            const currentUserUid = authSigner.verifyFromCookie(cookies)?.userUid
            if (currentUserUid) {
              return await prisma.user.findUnique({
                where: {
                  uid: currentUserUid,
                },
                include: {
                  profile: true,
                  hits: true,
                },
              })
            }
            return null
          },
        },
      },
    }),
    req,
    params,
  }
}

export type Context = ReturnType<typeof buildContext>
