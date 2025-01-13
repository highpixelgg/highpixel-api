import { Controller } from "core/infra/Controller";
import { fail, HttpResponse, ok } from "core/infra/HttpResponse";
import { SearchProfiles } from "./SearchProfiles";

type SearchProfilesControllerRequest = {
  query?: string;
  page?: string;
  per_page?: string;
  randomize?: string;
};

export class SearchProfilesController implements Controller {
  constructor(private searchProfiles: SearchProfiles) { }

  async handle({
    query,
    page,
    per_page,
    randomize,
  }: SearchProfilesControllerRequest): Promise<HttpResponse> {
    try {
      const { data, totalCount } = await this.searchProfiles.execute({
        query,
        page: page ? Number(page) : undefined,
        randomize: randomize === 'true' ? true : false,
        perPage: per_page ? Number(per_page) : undefined,
      });

      return ok({ data: data, totalCount });
    } catch (err) {
      return fail(err);
    }
  }
}