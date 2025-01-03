import {
  Tweet as PersistenceTweet, TweetLike as PersistenceTweetLike, User as PersistenceUser
} from "@prisma/client";
import { Tweet } from "../domain/Tweet";
import { TweetLike } from "../domain/TweetLike";
import { UserMapper } from "./UserMapper";

type PersistenceTweetRaw = PersistenceTweet & {
  user: PersistenceUser;
  tweetLike: PersistenceTweetLike[];
};

export class TweetMapper {
  static toDomain(raw: PersistenceTweetRaw): Tweet {
    const user = UserMapper.toDomain(raw.user);
    const tweet = Tweet.create(
      {
        authorId: raw.authorId,
        body: raw.body,
        image: raw.image,
        createdAt: raw.createdAt,
        answerOf: raw.answerOf,
        user,
        likes: [],
      },
      raw.id
    );

    const likes = raw.tweetLike.map((like) =>
      TweetLike.create(
        {
          userId: like.userId,
          tweetId: like.tweetId,
          user,
          tweet,
        },
        like.id
      )
    );
    return tweet;
  }

  static async toPersistence(tweet: Tweet) {
    return {
      id: tweet.id,
      authorId: tweet.authorId,
      body: tweet.body,
      image: tweet.image,
      createdAt: tweet.createdAt,
      answerOf: tweet.answerOf,
      user: tweet.user,
      likes: tweet.likes,
    }
  }
}