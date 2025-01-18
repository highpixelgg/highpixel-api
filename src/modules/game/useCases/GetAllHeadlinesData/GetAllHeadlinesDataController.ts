import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { GetAllHeadlinesData } from "./GetAllHeadlinesData";

type GetAllHeadlinesControllerRequest = {
  user: { id: string },
};

export class GetAllHeadlinesController implements Controller {
  constructor(private getAllHeadlinesData: GetAllHeadlinesData) { }

  async handle({ user }: GetAllHeadlinesControllerRequest): Promise<HttpResponse> {
    const result = await this.getAllHeadlinesData.execute({
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