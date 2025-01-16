import { Controller } from "@core/infra/Controller";
import { clientError, HttpResponse, ok } from "@core/infra/HttpResponse";
import { UpdatePlayerMoney } from "./UpdatePlayerMoney";

type UpdatePlayerMoneyControllerRequest = {
  nickname: string;
  money: number;
  user: { id: string },
};

export class UpdatePlayerMoneyController implements Controller {
  constructor(private updatePlayerMoney: UpdatePlayerMoney) { }

  async handle({ nickname, money, user }: UpdatePlayerMoneyControllerRequest): Promise<HttpResponse> {
    const result = await this.updatePlayerMoney.execute({
      nickname,
      money,
      authorId: user.id,
    });

    if (result.isLeft()) {
      const error = result.value;
      return clientError(error);
    } else {
      return ok();
    }
  }
}