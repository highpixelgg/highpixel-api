import { User } from "@prisma/client";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { HttpResponse, unauthorized, ok, fail } from "core/infra/HttpResponse";
import { Middleware } from "core/infra/Middleware";
import { JWT } from "modules/accounts/domain/jwt";


type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() { }

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken && accessToken.length > 1000) {
        return unauthorized(new ParametersErrors('Access denied'));;
      }

      if (accessToken) {
        try {
          const decoded = JWT.decodeToken(accessToken);
          const user = decoded.value as unknown as User;

          if (decoded.isLeft()) {
            return unauthorized(new ParametersErrors('Access denied'));;
          }

          return ok({ user: user });
        } catch (err) {
          return unauthorized(new ParametersErrors('Access denied'));;
        }
      } else {
        return unauthorized(new ParametersErrors('Access denied'));;
      }
    } catch (error) {
      return fail(error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}