import { prisma } from "@infra/prisma/prisma-client";
import { IVehiclesRepository } from "@modules/game/repositories/IVehicleRepository";
import { Player } from "@modules/player/domain/Player";
import { PlayerMapper } from "@modules/player/mappers/PlayerMapper";
import { IPlayerRepository } from "../IPlayerRepository";
import { IPlayerVehiclesRepository } from "../IPlayerVehicleRepository";

export class PrismaPlayerRepository implements IPlayerRepository {
  constructor(
    private playerVehiclesRepository?: IPlayerVehiclesRepository
  ) { }

  async exists(nickname: string): Promise<boolean> {
    const dbQuery = await prisma.player.findFirst({
      where: {
        nickname: nickname,
      },
    });

    return !!dbQuery;
  }

  async findByNickname(nickname: string): Promise<Player> {
    const dbQuery = await prisma.player.findFirst({
      where: {
        nickname: nickname,
      },
      include: { vehicles: true },
    });

    return PlayerMapper.toDomain(dbQuery);
  }

  async findAll(): Promise<Player[]> {
    const dbQuery = await prisma.player.findMany({
      include: {
        vehicles: true,
        user: true,
      },
    });

    return dbQuery.map(player => PlayerMapper.toDomain(player));
  }

  async save(raw: Player): Promise<void> {
    const data = PlayerMapper.toPersistence(raw)

    await prisma.player.update({
      where: {
        id: raw.id,
      },
      data,
    })

    if (this.playerVehiclesRepository) {
      await this.playerVehiclesRepository.save(raw.vehicles);
    }
  }
}
