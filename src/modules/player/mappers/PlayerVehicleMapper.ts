import { VehicleMapper } from "@modules/game/mappers/VehicleMapper";
import { Vehicle as PersistenceVehicle, PlayerVehicle as PersistentePlayerVehicleRaw, Player } from "@prisma/client";
import { PlayerVehicle } from "../domain/PlayerVehicle";
import { Vehicles } from "@modules/game/domain/Vehicles";

type PlayerVehiclePersistenteRaw = PersistentePlayerVehicleRaw & {
  player?: Player;
  vehicles?: PersistenceVehicle[];
}

export class PlayerVehiclesMapper {
  static toDomain(raw: PlayerVehiclePersistenteRaw): PlayerVehicle {
    const vehiclesErr = raw.vehicles
      ? Vehicles.create(
        raw.vehicles.map(vehicle =>
          VehicleMapper.toDomain(vehicle)
        )
      )
      : Vehicles.create([]);

    const vehiclePlayer = PlayerVehicle.create({
      player: raw.player,
      playerId: raw.playerId,
      vehicle: vehiclesErr,
      vehicleId: raw.vehicleId,
      purchasedIn: raw.purchasedIn,
    }, raw.id)

    return vehiclePlayer
  }

  static toPersistence(raw: PlayerVehicle) {
    return {
      id: raw.id,
      playerId: raw.playerId,
      vehicleId: raw.vehicleId,
      purchaseIn: raw.purchasedIn,
    };
  }
}