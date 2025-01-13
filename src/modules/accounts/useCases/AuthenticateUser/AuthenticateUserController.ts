import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { AuthenticateUser } from "./AuthenticateUser";

type AuthenticateUserRequest = {
  authorization: string;
};

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUser: AuthenticateUser) { }

  async handle({ authorization }: AuthenticateUserRequest): Promise<HttpResponse> {
    if (!authorization) {
      return clientError(new Error('Authorization is required'))
    }

    const result = await this.authenticateUser.execute({
      buffer: authorization,
    });

    if (result.isLeft()) {
      const error = result.value

      return clientError(error)
    } else {
      const { token } = result.value;

      return ok({
        token,
      });
    }
  }
}