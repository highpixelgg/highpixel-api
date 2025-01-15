import { Controller } from "core/infra/Controller";
import { HttpResponse, ok, fail } from "core/infra/HttpResponse";
import { NotificationMapper } from "modules/accounts/mappers/NotificationMapper";
import { GetAccountData } from "./GetAccountData";

export class GetAccountDataController implements Controller {
  constructor(private getAccountData: GetAccountData) { }

  async handle({ user }): Promise<HttpResponse> {
    const result = await this.getAccountData.execute({ user });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      const Parse = result.value;

      return ok({
        _id: Parse.id,
        name: Parse.username.value,
        email: Parse.email.value,
        isPremium: Parse.isPremium,
        isVerified: Parse.isVerified,
        notifications: Parse.notifications
          .getItems()
          .map(notify => NotificationMapper.toPersistence(notify)),
        ...Parse.Profile,
        ...Parse.Player,
      });
    }
  }
}