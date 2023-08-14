import * as path from 'node:path'
import { makeSchema } from 'nexus'

import User from './user'

export const schema = makeSchema({
  types: [
    User,
  ],
  outputs: {
    // it should be default,
    // but it would not work if not specify it
    typegen: process.env.NODE_ENV !== 'production'
      ? path.resolve(process.cwd(), './node_modules/@types/nexus-typegen/index.d.ts')
      : false,
  },
})
