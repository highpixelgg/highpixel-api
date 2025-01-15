import { prisma } from "infra/prisma/prisma-client";
import { Trending } from "modules/social/domain/timeline/Trending";
import { TrendsMapper } from "modules/social/mappers/TrendingMapper";
import { ITrendRepository } from "../ITrendRepository";

export class PrismaTrendsRepository implements ITrendRepository {
  async getTrending(): Promise<Trending> {
    const raw = await prisma.trending.findFirst({
      select: {
        id: true,
        hashtag: true,
        counter: true,
        updatedAt: true,
      },
      orderBy: {
        counter: "desc",
      },
      take: 4,
    });

    return TrendsMapper.toDomain(raw);
  }

  async save(trending: Trending): Promise<void> {
    const data = TrendsMapper.toPersistence(trending);
    await prisma.trending.update({
      where: { id: trending.id },
      data,
    });
  }

  async create(hashtag: string): Promise<void> {
    const trendOrError = Trending.create({
      hashtag,
      counter: 1,
      updatedAt: new Date(),
    });

    if (trendOrError.isLeft()) {
      throw new Error(trendOrError.value.message);
    }

    const trend = trendOrError.value;
    const data = await TrendsMapper.toPersistence(trend);

    const existsHashtag = await prisma.trending.findFirst({
      where: { hashtag },
    });

    if (existsHashtag) {
      await prisma.trending.update({
        where: { id: existsHashtag.id },
        data: { counter: existsHashtag.counter + 1, updatedAt: new Date() },
      });
    } else {
      await prisma.trending.create({
        data,
      });
    }
  }
}  
