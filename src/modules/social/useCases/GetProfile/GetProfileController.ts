import { Controller } from "core/infra/Controller";
import { HttpResponse, ok, fail } from "core/infra/HttpResponse";
import { GetProfile } from "./GetProfile";

export class GetProfileController implements Controller {
  constructor(private getProfile: GetProfile) { }

  async handle({ ident, user }): Promise<HttpResponse> {
    const result = await this.getProfile.execute({ ident, user });

    if (result.isLeft()) {
      const error = result.value;

      return fail(error);
    } else {
      return ok(result.value);
    }
  }
}