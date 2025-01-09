import { Controller } from "core/infra/Controller";
import { HttpResponse, clientError, ok } from "core/infra/HttpResponse";
import { SearchPosts } from "./SearhPosts";

export class SearchPostsController implements Controller {
  constructor(private searchPosts: SearchPosts) { }

  async handle({
    user,
    query,
    page,
    perPage,
  }: ISearchPostsRequest): Promise<HttpResponse> {
    const result = await this.searchPosts.execute({
      user,
      query,
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