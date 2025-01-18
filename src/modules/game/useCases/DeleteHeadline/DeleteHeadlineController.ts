import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, created } from "@core/infra/HttpResponse";
import { DeleteHeadline } from "./DeleteHeadline";

type DeletHeadlineControllerRequest = {
  headlineId: string;
  user: { id: string },
};

export class DeleteHeadlineController implements Controller {
  constructor(private deleteHeadline: DeleteHeadline) { }

  async handle({
    headlineId,
    user,
  }: DeletHeadlineControllerRequest): Promise<HttpResponse> {
    const result = await this.deleteHeadline.execute({
      headlineId,
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return created();
    }
  }
} 