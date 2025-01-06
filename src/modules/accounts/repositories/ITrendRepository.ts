import { Trend } from "../domain/Trend"

export interface ITrendRepository {
  getTrending(): Promise<Trend[]>
  create(hashtag: string): Promise<void>
}