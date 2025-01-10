import { Controller } from "core/infra/Controller";
import { clientError, created, HttpResponse } from "core/infra/HttpResponse";
import { CreateUser } from "./CreateUser";

type CreateUserControllerRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export class CreateUserController implements Controller {
  constructor(private createUser: CreateUser) { }

  async handle({ name, email, password }: CreateUserControllerRequest): Promise<HttpResponse> {
    const result = await this.createUser.execute({ name, email, password })

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return created();
    }
  }
} 