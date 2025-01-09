import { Controller } from "core/infra/Controller";
import { HttpResponse, clientError, ok } from "core/infra/HttpResponse";
import { SubscribeVisitor } from "./SubscribeVisitor";

type SubscribeVisitorRequest = {
  visitors_id: string;
  visitor_id: string;
};

export class SubscribeVisitorController implements Controller {
  constructor(private updateProfile: SubscribeVisitor) { }

  async handle(data: SubscribeVisitorRequest): Promise<HttpResponse> {
    const result = await this.updateProfile.execute(data);

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok();
    }
  }
}