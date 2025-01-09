import { prisma } from "infra/prisma/prisma-client";
import { ITrendRepository } from "../ITrendRepository";
import { Trending } from "modules/social/domain/timeline/Trending";
import { TrendsMapper } from "modules/social/mappers/TrendingMapper";

export class PrismaTrendsRepository implements ITrendRepository {
  async getTrending(): Promise<Trending[]> {
    const trends = await prisma.trending.findMany({
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

    return trends.map((trend) => TrendsMapper.toDomain(trend));
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
