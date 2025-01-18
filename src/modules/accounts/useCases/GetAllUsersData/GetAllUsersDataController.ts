import { Controller } from "core/infra/Controller";
import { clientError, HttpResponse, ok } from "core/infra/HttpResponse";
import { GetAllUsersData } from "./GetAllUsersData";

export class GetAllUsersController implements Controller {
  constructor(private getAllUsersData: GetAllUsersData) { }

  async handle(): Promise<HttpResponse> {
    const result = await this.getAllUsersData.execute();

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