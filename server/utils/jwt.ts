import * as _jsonwebtoken from 'jsonwebtoken'
import type {
  SignOptions,
  sign as signType,
  verify as verifyType,
  // VerifyOptions,
  // Algorithm,
} from 'jsonwebtoken'

const jsonwebtoken = <any>_jsonwebtoken
const sign: typeof signType = jsonwebtoken.default.sign
const verify: typeof verifyType = jsonwebtoken.default.verify

const secret = process.env.JWT_SECRET ?? 'my_secret'
export class JWT<T extends string | object> {
  #options: SignOptions = {}
  #name: string = ''
  constructor(name?: string, options?: SignOptions) {
    this.#options = options ?? this.#options
    this.#name = name ?? this.#name
  }

  #getSecret() {
    return `${secret}-${this.#name}`
  }

  sign(payload: T) {
    return sign(payload, this.#getSecret(), this.#options)
  }

  verify(token: string) {
    return verify(token, this.#getSecret(), this.#options) as T
  }
}
