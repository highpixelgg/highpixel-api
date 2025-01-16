import { Player } from "@modules/player/domain/Player";
import { IPlayerRepository } from "@modules/player/repositories/IPlayerRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type GetPlayerDataRequest = {
  nickname: string;
  authorId: string,
};

type GetPlayerDataResponse = Either<ParametersErrors, Player>;

export class GetPlayerData {
  constructor(
    private playerRepository: IPlayerRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ nickname, authorId }: GetPlayerDataRequest): Promise<GetPlayerDataResponse> {
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

    return right(player)
  }
}