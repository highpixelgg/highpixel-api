import { auth } from "config/auth"
import { ParametersErrors } from "core/domain/errors/ParameterErrors"
import { Either, left, right } from "core/logic/Either"
import { sign, verify } from 'jsonwebtoken'
import { User } from "./User"

interface JWTData {
  userId: string
  token: string
}

export interface JWTTokenPayload {
  exp: number
  sub: string
}

export class JWT {
  public readonly userId: string
  public readonly token: string

  private constructor({ userId, token }: JWTData) {
    this.userId = userId
    this.token = token
  }

  static decodeToken(token: string): Either<ParametersErrors, JWTTokenPayload> {
    try {
      const decode = verify(token, auth.secretKey) as JWTTokenPayload
      return right(decode)
    } catch (err) {
      return left(new ParametersErrors('Invalid JWT Token.', 400))
    }
  }

  static createJWT(token: string): Either<ParametersErrors, JWT> {
    const jwtPayloadOrError = this.decodeToken(token)

    if (jwtPayloadOrError.isLeft()) {
      return left(jwtPayloadOrError.value)
    }

    const jwt = new JWT({ token, userId: jwtPayloadOrError.value.sub })
    return right(jwt)
  }

  static signUser(user: User): JWT {
    const token = sign({}, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn
    })

    const jwt = new JWT({ userId: user.id, token })
    return jwt
  }
}