import { prisma } from '@infra/prisma/prisma-client';
import { Update } from '@modules/game/domain/Update';
import { UpdateMapper } from '@modules/game/mappers/UpdateMapper';
import { IUpdateRepository } from '../IUpdateRepository';

export class PrismaUpdateRepository implements IUpdateRepository {
  async save(update: Update): Promise<void> {
    const data = UpdateMapper.toPersistence(update);
    await prisma.update.create({
      data,
    });
  }

  async create(update: Update): Promise<void> {
    const data = UpdateMapper.toPersistence(update);
    await prisma.update.create({
      data,
    });
  }

  async findOne(ident: string): Promise<Update> {
    const dbQuery = await prisma.update.findFirst({
      where: {
        OR: [{ id: ident }, { version: ident }],
      },
    });

    if (!dbQuery) {
      return null;
    }

    return UpdateMapper.toDomain(dbQuery);
  }

  async findRecentUpdate(): Promise<Update> {
    const query = await prisma.update.findFirst({
      orderBy: {
        release: 'desc',
      },
    });

   return UpdateMapper.toDomain(query);
  }

  async delete(raw: Update): Promise<void> {
    await prisma.update.delete({
      where: {
        id: raw.id,
      },
    });
  }
}
