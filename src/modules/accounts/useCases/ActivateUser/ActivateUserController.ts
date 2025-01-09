import { Controller } from 'core/infra/Controller';
import { clientError, HttpResponse, ok } from 'core/infra/HttpResponse';
import { ActivateUser } from './ActivateUser';
import { IActivateUserRequest } from './ActivationUserDTO';

export class ActivateUserController implements Controller {
  constructor(private activateUser: ActivateUser) { }

  async handle({ id }: IActivateUserRequest): Promise<HttpResponse> {
    const result = await this.activateUser.execute({ id });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error)
    } else {
      return ok(result.value)
    }
  }
}