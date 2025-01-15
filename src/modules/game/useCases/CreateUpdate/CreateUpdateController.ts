import { Controller } from "core/infra/Controller";
import { clientError, created, HttpResponse } from "core/infra/HttpResponse";
import { CreateUpdate } from "./CreateUpdate";

type CreateUpdateControllerRequest = {
  product: string,
  version: string,
  download: string,
  changelogs: string,
  user: { id: string },
};

export class CreateUpdateController implements Controller {
  constructor(private createUpdate: CreateUpdate) { }

  async handle({
    product,
    version,
    download,
    changelogs,
    user,
  }: CreateUpdateControllerRequest): Promise<HttpResponse> {
    const result = await this.createUpdate.execute({
      product,
      version, 
      download, 
      changelogs, 
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