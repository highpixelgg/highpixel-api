import { Controller } from "@core/infra/Controller";
import { clientError, created, HttpResponse, ok } from "@core/infra/HttpResponse";
import { GetUpdateData } from "./GetUpdateData";

type GetUpdateControllerRequest = {
  updateId: string;
  user: { id: string },
};

export class GetUpdateDataController implements Controller {
  constructor(private getUpdateData: GetUpdateData) { }

  async handle({ updateId, user }: GetUpdateControllerRequest): Promise<HttpResponse> {
    const result = await this.getUpdateData.execute({
      updateId,
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