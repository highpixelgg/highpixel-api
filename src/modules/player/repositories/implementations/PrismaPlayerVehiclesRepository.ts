import { prisma } from "@infra/prisma/prisma-client";
import { NotificationMapper } from "@modules/accounts/mappers/NotificationMapper";
import { PlayerVehicle } from "@modules/player/domain/PlayerVehicle";
import { PlayerVehicles } from "@modules/player/domain/PlayerVehicles";
import { PlayerVehiclesMapper } from "@modules/player/mappers/PlayerVehicleMapper";
import { IPlayerVehiclesRepository } from "../IPlayerVehicleRepository";

export class PrismaPlayerVehiclesRepository implements IPlayerVehiclesRepository {
  async exists(vehicleId: string): Promise<boolean> {
    const dbQuery = await prisma.playerVehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    return !!dbQuery;
  }

  async findByVehicleId(vehicleId: string): Promise<PlayerVehicle> {
    const dbQuery = await prisma.playerVehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    return PlayerVehiclesMapper.toDomain(dbQuery);
  }

  async create(vehicles: PlayerVehicles): Promise<void> {
    const data = vehicles
      .getNewItems()
      .map(vehicle => PlayerVehiclesMapper.toPersistence(vehicle));

    await prisma.playerVehicle.createMany({
      data
    });
  }

  async delete(raw: PlayerVehicle): Promise<void> {
    await prisma.playerVehicle.delete({
      where: {
        id: raw.id
      }
    });
  }

  async findAll(): Promise<PlayerVehicle[]> {
    const dbQuery = await prisma.playerVehicle.findMany({
      orderBy: {
        purchasedIn: "desc",
      },
    });

    return dbQuery.map(vehicle => PlayerVehiclesMapper.toDomain(vehicle));
  }

  async save(vehicles: PlayerVehicles): Promise<void> {
    if (vehicles.getNewItems().length > 0) {
      const data = vehicles
        .getNewItems()
        .map(vehicle => PlayerVehiclesMapper.toPersistence(vehicle));

      await prisma.playerVehicle.createMany({
        data,
      });
    }

    if (vehicles.getRemovedItems().length > 0) {
      const removeIds = vehicles
        .getRemovedItems()
        .map(vehicle => vehicle.id);

      await prisma.vehicle.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async saveSingle(vehicles: PlayerVehicle): Promise<void> {
      const data = PlayerVehiclesMapper.toPersistence(vehicles);
  
      await prisma.notification.update({
        where: {
          id: data.id,
        },
        data,
      });
    }
}