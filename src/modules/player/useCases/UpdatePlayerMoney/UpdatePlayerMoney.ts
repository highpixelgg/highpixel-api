import { IPlayerRepository } from "@modules/player/repositories/IPlayerRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type UpdatePlayerMoneyDataRequest = {
  nickname: string;
  money: number;
  authorId: string,
};

type UpdatePlayerMoneyDataResponse = Either<ParametersErrors, boolean>;

export class UpdatePlayerMoney {
  constructor(
    private playerRepository: IPlayerRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ nickname, money, authorId }: UpdatePlayerMoneyDataRequest): Promise<UpdatePlayerMoneyDataResponse> {
    const userExist = await this.userRepository.findOne(authorId);

    if (userExist.role !== "ADMIN") {
      return left(new ParametersErrors('Access denied.'))
    }

    if (!nickname) {
      return left(new ParametersErrors('Nickname not found.'))
    }

    const player = await this.playerRepository.findByNickname(nickname);
    if (!player) {
      return left(new ParametersErrors('Player not found.'))
    }

    if (!money) {
      return left(new ParametersErrors('Money invalid.'))
    }

    player.setMoney(Number((money)))
    await this.playerRepository.save(player)

    return right(true)
  }
}