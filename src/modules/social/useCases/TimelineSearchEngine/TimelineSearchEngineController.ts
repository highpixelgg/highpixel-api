import { Controller } from "core/infra/Controller";
import { HttpResponse, clientError, ok } from "core/infra/HttpResponse";
import { TimelineSearchEngine } from "./TimelineSearchEngine";

type TimelineSearchEngineControllerRequest = {
  user: { id: string };
  page?: string;
  perPage?: string;
};

export class TimelineSearchEngineController implements Controller {
  constructor(private timelineSearchEngine: TimelineSearchEngine) { }

  async handle({
    page,
    perPage,
    user,
  }: TimelineSearchEngineControllerRequest): Promise<HttpResponse> {
    const result = await this.timelineSearchEngine.execute({
      user,
      page: page ? Number(page) : undefined,
      perPage: page ? Number(perPage) : undefined,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok(result.value);
    }
  }
}
