import { Player as PersistentePlayerRaw, PlayerVehicle as PersistentePlayerVehicleRaw, User } from "@prisma/client";
import { Player } from "../domain/Player";
import { PlayerVehicles } from "../domain/PlayerVehicles";
import { PlayerVehiclesMapper } from "./PlayerVehicleMapper";

type PlayerPersistenteRaw = PersistentePlayerRaw & {
  user?: User;
  vehicles: PersistentePlayerVehicleRaw[];
}

type topPeristenceRaw = {
  nickname: string;
  money: number;
}

export class PlayerMapper {
  static toDomain(raw: PlayerPersistenteRaw): Player {
    const playerVehiclesErr = raw.vehicles
      ? PlayerVehicles.create(
        raw.vehicles.map(vehicle =>
          PlayerVehiclesMapper.toDomain(vehicle)
        )
      )
      : PlayerVehicles.create([]);

    const playerOrError = Player.create({
      nickname: raw.nickname,
      money: Number(raw.money),
      vehicles: playerVehiclesErr,
      user: raw.user,
    }, raw.id)

    if (playerOrError.isRight()) {
      return playerOrError.value;
    }

    return null
  }

  static toPersistence(raw: topPeristenceRaw) {
    return {
      nickname: raw.nickname,
      money: raw.money,
    };
  }
}
