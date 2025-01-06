import {
  Tweet as PersistenceTweet,
  TweetLike as PersistenceTweetLike,
  User as PersistenceUser
} from "@prisma/client";
import { Tweet } from "../domain/Tweet";
import { TweetLike } from "../domain/TweetLike";
import { UserMapper } from "./UserMapper";

type PersistenceTweetRaw = PersistenceTweet & {
  user?: PersistenceUser;
  TweetLikes?: PersistenceTweetLike[];
};

export class TweetMapper {
  static toDomain(raw: PersistenceTweetRaw): Tweet {
    const userOrError = UserMapper.toDomain(raw.user);

    if (!userOrError) {
      throw new Error('User data is invalid.');
    }

    const tweetLikesOrErr = raw.TweetLikes?.map(tweetLike => {
      const tweet = Tweet.create({
        authorId: raw.authorId,
        body: raw.body,
        image: raw.image,
        createdAt: raw.createdAt,
        answerOf: raw.answerOf,
        user: userOrError,
      }, raw.id);

      return TweetLike.create({
        userId: tweetLike.userId,
        tweetId: tweetLike.tweetId,
        user: userOrError,
        tweet: tweet,
      });
    }) || [];

    const tweet = Tweet.create(
      {
        authorId: raw.authorId,
        body: raw.body,
        image: raw.image,
        createdAt: raw.createdAt,
        answerOf: raw.answerOf,
        user: userOrError,
        tweetLikes: tweetLikesOrErr,
      },
      raw.id
    );
    return tweet;
  }

  static toDto(raw: PersistenceTweetRaw) {
    return {
      id: raw.id,
      authorId: raw.authorId,
      body: raw.body,
      image: raw.image,
      createdAt: raw.createdAt,
      answerOf: raw.answerOf,
      userId: raw.user?.id,
    };
  }

  static toPersistence(tweet: Tweet) {
    return {
      id: tweet.id,
      authorId: tweet.authorId,
      body: tweet.body,
      image: tweet.image,
      createdAt: tweet.createdAt,
      answerOf: tweet.answerOf,
    };
  }
}
