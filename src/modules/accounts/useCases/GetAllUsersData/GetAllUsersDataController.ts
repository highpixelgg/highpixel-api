import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { GetAllUsersData } from "./GetAllUsersData";

type GetAllUsersControllerRequest = {
  user: { id: string },
};

export class GetAllUsersController implements Controller {
  constructor(private getAllUsersData: GetAllUsersData) { }

  async handle({ user }: GetAllUsersControllerRequest): Promise<HttpResponse> {
    const result = await this.getAllUsersData.execute({
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok({
        ...result.value,
      });
    }
  }
} 