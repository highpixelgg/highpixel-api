import { Vehicle } from "../domain/Vehicle";
import { Vehicles } from "../domain/Vehicles";

export interface IVehiclesRepository {
  exists(vehicleId: string): Promise<boolean>;
  create(vehicle: Vehicle): Promise<void>;
  delete(raw: Vehicle): Promise<void>;
  save(vehicles: Vehicles): Promise<void>;
  findOne(ident: string): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
}