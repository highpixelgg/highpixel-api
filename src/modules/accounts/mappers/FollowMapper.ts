import { Follow as PersistenceFollow } from "@prisma/client";
import { Follow } from "../domain/Follow";

export class FollowMapper {
  static toDomain(raw: PersistenceFollow): Follow {
    const follow = Follow.create(
      {
        user1Slug: raw.user1Slug,
        user2Slug: raw.user2Slug,
      }, raw.id
    )
    return follow
  }
  static async toPersistence(follow: Follow) {
    return {
      id: follow.id,
      user1Slug: follow.user1Slug,
      user2Slug: follow.user2Slug,
    }
  }
}