import { TweetLike as PersistenceTweetLike, Tweet as PersistenceTweet, User as PersistenceUser } from "@prisma/client";
import { TweetLike } from "../domain/TweetLike";
import { UserMapper } from "./UserMapper";
import { TweetMapper } from "./TweetMapper";

type PersistenceTweetLikeRaw = PersistenceTweetLike & {
  user: PersistenceUser;
  tweet: PersistenceTweet;  // Tweet aqui é um único tweet, não um array
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

    const tweetLike = TweetLike.create(
      {
        userId: raw.userId,
        tweetId: raw.tweetId,
        user: user,
        tweet: tweet
      },
      raw.id
    );
    return tweetLike;
  }

  static async toPersistence(tweetLike: TweetLike) {
    return {
      id: tweetLike.id,
      tweetId: tweetLike.tweetId,
      user: tweetLike.user,
      tweet: tweetLike.tweet,
    };
  }
}
