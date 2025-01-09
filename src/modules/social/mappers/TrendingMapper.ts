import { Trending as PersistenceTrend } from "@prisma/client";
import { Trending } from "../domain/timeline/Trending";


export class TrendsMapper {
  static toDomain(raw: PersistenceTrend): Trending {
    const trend = Trending.create(
      {
        hashtag: raw.hashtag,
        counter: raw.counter,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )

    if (trend.isRight()) {
      return trend.value;
    }

    return null
  }

  static async toPersistence(trend: Trending) {
    return {
      id: trend.id,
      hashtag: trend.hashtag,
      counter: trend.counter,
      updatedAt: trend.updatedAt,
    }
  }
}