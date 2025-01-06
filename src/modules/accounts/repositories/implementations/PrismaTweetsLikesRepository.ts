import { prisma } from "infra/prisma/prisma-client";
import { TweetsLikes } from "modules/accounts/domain/TweetsLikes";
import { TweetLikeMapper } from "modules/accounts/mappers/TweetLikeMapper";
import { ITweetsLikesRepository } from "../ITweetsLikesRepository";

export class PrismaTweetsLikes implements ITweetsLikesRepository {
  async checkIfTweetIsLikedByUser(userId: string, tweetId: string): Promise<boolean> {
    const isLiked = await prisma.tweetLike.findFirst({
      where: {
        userId: userId,
        tweetId: tweetId,
      },
    });
    return !!isLiked
  }

  async likeTweet(tweetId: string, authorId: string): Promise<void> {
    await prisma.tweetLike.create({
      data: {
        userId: authorId,
        tweetId: tweetId,
      }
    });
  }

  async unlikeTweet(tweetId: string, authorId: string): Promise<void> {
    await prisma.tweetLike.deleteMany({
      where: {
        userId: authorId,
        tweetId: tweetId,
      }
    });
  }

  async save(tweetsLikes: TweetsLikes): Promise<void> {
    if (tweetsLikes.getNewItems().length > 0) {
      const data = await Promise.all(tweetsLikes.getNewItems().map(tweetLike =>
        TweetLikeMapper.toPersistence(tweetLike)
      ));
      await prisma.tweetLike.createMany({ data });
    }
  }
}