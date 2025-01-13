import { Controller } from "core/infra/Controller";
import { HttpResponse, clientError, ok } from "core/infra/HttpResponse";
import { SearchPosts } from "./SearchPosts";

type SearchPostsControllerRequest = {
  user: { id: string };
  query?: string;
  page?: string;
  per_page?: string;
};

export class SearchPostsController implements Controller {
  constructor(private searchPosts: SearchPosts) { }

  async handle({
    user,
    query,
    page,
    per_page,
  }: SearchPostsControllerRequest): Promise<HttpResponse> {
    const result = await this.searchPosts.execute({
      user,
      query,
      page: page ? Number(page) : undefined,
      perPage: page ? Number(per_page) : undefined,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok(result.value);
    }
  }
}