import { Controller } from "@core/infra/Controller";
import { clientError, HttpResponse, ok } from "@core/infra/HttpResponse";
import { GetPlayerData } from "./GetPlayerData";

type GetPlayerDataControllerRequest = {
  nickname: string;
  user: { id: string },
};

export class GetPlayerDataController implements Controller {
  constructor(private getPlayerData: GetPlayerData) { }

  async handle({ nickname, user }: GetPlayerDataControllerRequest): Promise<HttpResponse> {
    const result = await this.getPlayerData.execute({
      nickname,
      authorId: user.id,
    });

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