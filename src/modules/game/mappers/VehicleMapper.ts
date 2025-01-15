import { Vehicle as PersistenceVehicleRaw } from "@prisma/client";
import { Vehicle } from "../domain/Vehicle";

export class VehicleMapper {
  static toDomain(raw: PersistenceVehicleRaw) {
    const vehicleOrErr = Vehicle.create({
      name: raw.name,
      type: raw.type,
      price: Number(raw.price),
      createdAt: raw.createdAt,
    }, raw.id);

    if (vehicleOrErr.isRight()) {
      return vehicleOrErr.value;
    }

    return null
  }

  static toPersistence(raw: Vehicle) {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type,
      price: raw.price,
      createdAt: raw.createdAt,
    };
  }
}