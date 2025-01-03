import { TweetLike as PersistenceTweetLike, Tweet as PersistenceTweet, User as PersistenceUser } from "@prisma/client";
import { TweetLike } from "../domain/TweetLike";
import { UserMapper } from "./UserMapper";
import { TweetMapper } from "./TweetMapper";

type PersistenceTweetLikeRaw = PersistenceTweetLike & {
  user: PersistenceUser;
  tweet: PersistenceTweet; 
  tweetLike: PersistenceTweetLike[];
};

export class TweetLikeMapper {
  static toDomain(raw: PersistenceTweetLikeRaw): TweetLike {
    const user = UserMapper.toDomain(raw.user);
  
    const tweet = TweetMapper.toDomain({
      ...raw.tweet,
      user: raw.user,
      tweetLike: raw.tweetLike,
    });
  
    return TweetLike.create(
      {
        userId: raw.userId,
        tweetId: raw.tweetId,
        user,
        tweet,
      },
      raw.id
    );
  }

  static async toPersistence(tweetLike: TweetLike) {
    return {
      id: tweetLike.id,
      tweetId: tweetLike.tweetId,
      userId: tweetLike.userId,
    };
  }
}
