import { Follow as PersistenceFollow } from "@prisma/client";
import { Follow } from "../domain/Follow";

export class FollowMapper {
  static toDomain(raw: PersistenceFollow): Follow {
    const follow = Follow.create(
      {
        userId1: raw.userId1,
        userId2: raw.userId2,
      }, raw.id
    )
    return follow
  }
  
  static async toPersistence(follow: Follow) {
    return {
      id: follow.id,
      userId1: follow.userId1,
      userId2: follow.userId2,
    }
  }
}