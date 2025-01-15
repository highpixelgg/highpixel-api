import { prisma } from "@infra/prisma/prisma-client";
import { Vehicle } from "@modules/game/domain/Vehicle";
import { Vehicles } from "@modules/game/domain/Vehicles";
import { VehicleMapper } from "@modules/game/mappers/VehicleMapper";
import { IVehiclesRepository } from "../IVehicleRepository";

export class PrismaVehicleRepository implements IVehiclesRepository {
  async exists(vehicleId: string): Promise<boolean> {
    const dbQuery = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    return !!dbQuery;
  }

  async findOne(ident: string): Promise<Vehicle> {
    const dbQuery = await prisma.vehicle.findFirst({
      where: {
        OR: [{ id: ident }, { type: ident }, { name: ident }],
      },
    });

    if (!dbQuery) {
      return null;
    }

    return VehicleMapper.toDomain(dbQuery);
  }

  async create(vehicle: Vehicle): Promise<void> {
    const data = VehicleMapper.toPersistence(vehicle);
    await prisma.vehicle.create({ data });
  }

  async delete(raw: Vehicle): Promise<void> {
    await prisma.vehicle.delete({
      where: {
        id: raw.id
      }
    });
  }

  async findAll(): Promise<Vehicle[]> {
    const dbQuery = await prisma.vehicle.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return dbQuery.map(vehicle => VehicleMapper.toDomain(vehicle));
  }

  async save(vehicles: Vehicles): Promise<void> {
    if (vehicles.getNewItems().length > 0) {
      const data = vehicles
        .getNewItems()
        .map(veh => VehicleMapper.toPersistence(veh));

      await prisma.vehicle.createMany({
        data,
      });
    }

    if (vehicles.getRemovedItems().length > 0) {
      const removeIds = vehicles.getRemovedItems().map(veh => veh.id);

      await prisma.vehicle.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }
}
