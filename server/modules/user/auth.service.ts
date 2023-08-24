import { JWT } from '../../utils/jwt'
import type { Context } from '../context'

class AuthJwt extends JWT<Payload> {
  constructor() {
    super('auth')
  }

  signAndWriteCookie(payload: Payload, ctx: Context) {
    const token = this.sign(payload)
    // write token to cookie 'auth'
    ctx.req.context.res.setHeader('Set-Cookie',
      `tges:auth=${token}; Path=/; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}HttpOnly; SameSite=Strict; Max-Age=604800`,
    )
  }

  verifyFromCookie(cookies: string) {
    // load cookie from auth
    const token = cookies.split(';').find(c => c.trim().startsWith('tges:auth='))
    if (!token) {
      return null
    }
    const tokenValue = token.split('=')[1]
    return this.verify(tokenValue)
  }

  removeCookie(ctx: Context) {
    ctx.req.context.res.setHeader('Set-Cookie',
      'tges:auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
    )
  }
}

export const authSigner = new AuthJwt()

interface Payload {
  userUid: string
}
