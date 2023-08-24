import * as path from 'node:path'
import { makeSchema } from 'nexus'

import UserModule from './user'
import ProfileModule from './profile'
import HitModule from './hit'
import { DateScalar } from './utils/date'

export const schema = makeSchema({
  types: [
    UserModule,
    ProfileModule,
    HitModule,
    DateScalar,
  ],
  outputs: {
    // it should be default,
    // but it would not work if not specify it
    typegen: process.env.NODE_ENV !== 'production'
      ? path.resolve(process.cwd(), './node_modules/@types/nexus-typegen/index.d.ts')
      : false,
  },
  contextType: process.env.NODE_ENV !== 'production'
    ? {
        module: path.resolve(process.cwd(), './server/modules/context.ts'),
        export: 'Context',
      }
    : undefined,
})
