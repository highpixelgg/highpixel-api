import { Trend as PersistenceTrend } from "@prisma/client"
import { Trend } from "../domain/Trend"

export class TrendsMapper {
  static toDomain(raw: PersistenceTrend):Trend {
    const trend = Trend.create(
      {
        hashtag: raw.hashtag,
        counter: raw.counter,
        updatedAt: raw.updatedAt,
      },
      raw.id
    )
    return null
  }

  static async toPersistence(trend: Trend) {
    return {
      id: trend.id,
      hashtag: trend.hashtag,
      counter: trend.counter,
      updatedAt: trend.updatedAt,
    }
  }
}