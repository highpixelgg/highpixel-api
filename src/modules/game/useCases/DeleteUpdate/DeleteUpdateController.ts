import { Controller } from "@core/infra/Controller";
import { HttpResponse, clientError, created } from "@core/infra/HttpResponse";
import { DeleteUpdate } from "./DeleteUpdate";


type DeleteUpdateControllerRequest = {
  updateId: string;
  user: { id: string },
};

export class DeleteUpdateController implements Controller {
  constructor(private deleteUpdate: DeleteUpdate) { }

  async handle({
    updateId,
    user,
  }: DeleteUpdateControllerRequest): Promise<HttpResponse> {
    const result = await this.deleteUpdate.execute({
      updateId,
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