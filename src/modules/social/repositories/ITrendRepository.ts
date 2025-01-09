import { Trending } from "../domain/timeline/Trending"

export interface ITrendRepository {
  getTrending(): Promise<Trending[]>
  create(hashtag: string): Promise<void>
}