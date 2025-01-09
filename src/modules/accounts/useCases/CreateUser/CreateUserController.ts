import { Controller } from "core/infra/Controller";
import { clientError, created, HttpResponse } from "core/infra/HttpResponse";
import { CreateUser } from "./CreateUser";
import { ICreateUserRequest } from "./CreateUserDTO";

export class CreateUserController implements Controller {
  constructor(private createUser: CreateUser) { }

  async handle({ name, email, password }: ICreateUserRequest): Promise<HttpResponse> {
    const result = await this.createUser.execute({ name, email, password })

    if (result.isLeft()) {
      const error = result.value

      return clientError(error)
    } else {
      return created();
    }
  }
} 