import { prisma } from '@infra/prisma/prisma-client';
import { Headline } from '@modules/game/domain/Headline';
import { HeadlineMapper } from '@modules/game/mappers/HeadlineMapper';
import { IHeadlineRepository } from '../IHeadlineRepository';

export class PrismaHeadlineRepository implements IHeadlineRepository {
  async save(headline: Headline): Promise<void> {
    const data = HeadlineMapper.toPersistence(headline);
    await prisma.headlines.create({
      data,
    });
  }

  async create(headline: Headline): Promise<void> {
    const data = HeadlineMapper.toPersistence(headline);
    await prisma.headlines.create({
      data,
    });
  }

  async findOne(ident: string): Promise<Headline> {
    const dbQuery = await prisma.headlines.findFirst({
      where: {
        OR: [{ id: ident }, { title: ident }],
      },
    });

    if (!dbQuery) {
      return null;
    }

    return HeadlineMapper.toDomain(dbQuery);
  }

  async findRecentHeadline(): Promise<Headline> {
    const query = await prisma.headlines.findFirst({
      orderBy: {
        createAt: 'desc',
      },
    });

    return HeadlineMapper.toDomain(query);
  }

  async delete(raw: Headline): Promise<void> {
    await prisma.headlines.delete({
      where: {
        id: raw.id,
      },
    });
  }

  async findAll(): Promise<Headline[]> {
    const dbQuery = await prisma.headlines.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return dbQuery.map(headline => HeadlineMapper.toDomain(headline));
  }
}
