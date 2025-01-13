import { auth } from "config/auth"
import { ParametersErrors } from "core/domain/errors/ParameterErrors"
import { Either, left, right } from "core/logic/Either"
import { sign, verify } from 'jsonwebtoken'
import { User } from "./User"

interface JWTData {
  id: string;
  token: string;
}

export interface JWTTokenPayload {
  exp: number;
  sub: JWTData;
}

export class JWT {
  static sign(arg0: string, user: User): string {
    throw new Error("Method not implemented.")
  }

  public readonly id: string;
  public readonly token: string;

  private constructor({ id, token }: JWTData) {
    this.id = id;
    this.token = token;
  }

  static decodeToken(token: string): Either<ParametersErrors, JWTTokenPayload> {
    try {
      const decode = verify(token, auth.secretKey) as unknown as JWTTokenPayload;
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

    const jwt = new JWT({ token, id: jwtPayloadOrError.value.sub.id })
    return right(jwt)
  }

  static signUser(user: User): JWT {
    const token = sign({
      id: user.id
    }, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    })

    const jwt = new JWT({ id: user.id, token })
    return jwt;
  }
}