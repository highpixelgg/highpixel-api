import { PlayerVehicle } from "../domain/PlayerVehicle";
import { PlayerVehicles } from "../domain/PlayerVehicles";

export interface IPlayerVehiclesRepository {
  exists(vehicleId: string): Promise<boolean>;
  create(vehicle: PlayerVehicles): Promise<void>;
  delete(raw: PlayerVehicle): Promise<void>;
  save(vehicles: PlayerVehicles): Promise<void>;
  findByVehicleId(vehicleId: string): Promise<PlayerVehicle>;
  findAll(): Promise<PlayerVehicle[]>;
}