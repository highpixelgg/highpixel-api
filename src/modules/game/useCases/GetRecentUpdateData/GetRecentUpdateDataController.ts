import { Controller } from "@core/infra/Controller";
import { clientError, HttpResponse, ok } from "@core/infra/HttpResponse";
import { GetRecentUpdateData } from "./GetRecentUpdateData";

type GetRecentUpdateControllerRequest = {
  user: { id: string },
};

export class GetRecentUpdateDataController implements Controller {
  constructor(private getRecentUpdateData: GetRecentUpdateData) { }

  async handle({ user }: GetRecentUpdateControllerRequest): Promise<HttpResponse> {
    const result = await this.getRecentUpdateData.execute({
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