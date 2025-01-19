import { Controller } from "core/infra/Controller";
import { fail, HttpResponse, ok } from "core/infra/HttpResponse";
import { NotificationMapper } from "modules/accounts/mappers/NotificationMapper";
import { GetAccountData } from "./GetAccountData";
import { IGetAccountDataRequest } from "./GetAccountDataDTO";

export class GetAccountDataController implements Controller {
  constructor(private getAccountData: GetAccountData) { }

  async handle({ id }: IGetAccountDataRequest): Promise<HttpResponse> {
    const result = await this.getAccountData.execute({ id });

    if (result.isLeft()) {
      const error = result.value;
      return fail(error);
    } else {
      const Parse = result.value;

      return ok({
        id: Parse.id,
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