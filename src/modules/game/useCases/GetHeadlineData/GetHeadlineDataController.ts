import { Controller } from "@core/infra/Controller";
import { clientError, HttpResponse, ok } from "@core/infra/HttpResponse";
import { GetHeadlineData } from "./GetHeadlineData";

type GetHeadlineControllerRequest = {
  headlineId: string;
  user: { id: string },
};

export class GetHeadlineDataController implements Controller {
  constructor(private getHeadlineData: GetHeadlineData) { }

  async handle({ headlineId, user }: GetHeadlineControllerRequest): Promise<HttpResponse> {
    const result = await this.getHeadlineData.execute({
      headlineId,
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