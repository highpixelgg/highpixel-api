import { PlayerVehicle } from "@modules/player/domain/PlayerVehicle";
import { IPlayerRepository } from "@modules/player/repositories/IPlayerRepository";
import { IPlayerVehiclesRepository } from "@modules/player/repositories/IPlayerVehicleRepository";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IUserRepository } from "modules/accounts/repositories/IUserRepository";

type AddVehiclePlayerRequest = {
  nickname: string;
  vehicleId: string;
  authorId: string,
};

type AddVehiclePlayerResponse = Either<ParametersErrors, PlayerVehicle>;

export class AddVehiclePlayer {
  constructor(
    private playerRepository: IPlayerRepository,
    private userRepository: IUserRepository,
  ) { }

  async execute({ nickname, vehicleId, authorId }: AddVehiclePlayerRequest): Promise<AddVehiclePlayerResponse> {
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

    if (!vehicleId) {
      return left(new ParametersErrors('Vehicle invalid.'))
    }

    const vehicle = PlayerVehicle.create({
      playerId: player.id,
      vehicleId,
      purchasedIn: new Date(),
    })
    
    player.addVehicle(vehicle)
    await this.playerRepository.save(player)

    return right(vehicle)
  }
}