import { prisma } from "infra/prisma/prisma-client";
import { Tweet } from "modules/accounts/domain/Tweet";
import { Tweets } from "modules/accounts/domain/Tweets";
import { TweetMapper } from "modules/accounts/mappers/TweetMapper";
import { getPublicURL } from "utils/getPublicURL";
import { ITweetsRepository } from "../ITweetsRepository";

export class PrismaTweets implements ITweetsRepository {
  async create(tweets: Tweets): Promise<void> {
    const data = tweets.getNewItems().map((tweet) =>
      TweetMapper.toPersistence(tweet)
    );
    await prisma.tweet.createMany({ data });
  }

  async findTweetById(tweetId: string): Promise<Tweet> {
    const query = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        user: true,
        likes: true,
      },
    });

    if (query) {
      query.user.avatar = getPublicURL(query.user.avatar);
    }

    return TweetMapper.toDomain(query);
  }

  async findTweetsByUser(id: string, currentPage: number, perPage: number): Promise<Tweet[]> {
    const query = await prisma.tweet.findMany({
      where: {
        authorId: id,
        answerOf: 0,
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: currentPage * perPage,
      take: perPage,
      include: {
        likes: {
          select: {
            userId: true,
          }
        }
      },
    });

    return query.map(tweet => TweetMapper.toDomain(tweet))
  }

  async findAnswersTweet(answerId: number): Promise<Tweet[]> {
    const query = await prisma.tweet.findMany({
      where: {
        answerOf: answerId,
      },
      include: {
        user: true,
        likes: true,
      },
    });

    for (let tweetIndex in query) {
      query[tweetIndex].user.avatar = getPublicURL(query[tweetIndex].user.avatar);
    }

    return query.map(tweet => TweetMapper.toDomain(tweet))
  }

  async findTweetFeed(following: string[], currentPage: number, perPage: number): Promise<Tweet[]> {
    const query = await prisma.tweet.findMany({
      where: {
        authorId: { in: following },
        answerOf: 0,
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: currentPage * perPage,
      take: perPage,
      include: {
        user: true,
        likes: true,
      }
    });

    for (let tweetIndex in query) {
      query[tweetIndex].user.avatar = getPublicURL(query[tweetIndex].user.avatar);
    }

    return query.map(tweet => TweetMapper.toDomain(tweet))
  }

  async findTweetsByBody(bodyContains: string, currentPage: number, perPage: number): Promise<Tweet[]> {
    const query = await prisma.tweet.findMany({
      where: {
        body: {
          contains: bodyContains,
          mode: 'insensitive'
        },
        answerOf: 0
      },
      orderBy: { createdAt: 'desc' },
      skip: currentPage * perPage,
      take: perPage,
      include: {
        user: true,
        likes: true,
      }
    });

    for (let tweetIndex in query) {
      query[tweetIndex].user.avatar = getPublicURL(query[tweetIndex].user.avatar);
    }

    return query.map(tweet => TweetMapper.toDomain(tweet))
  }

  async getUserTweetCount(userId: string): Promise<number> {
    const count = await prisma.tweet.count({
      where: {
        authorId: userId
      }
    });
    return count;
  }


  async save(tweets: Tweets): Promise<void> {
    if (tweets.getNewItems().length > 0) {
      const data = await Promise.all(tweets.getNewItems().map(tweet =>
        TweetMapper.toPersistence(tweet)
      ));

      await prisma.tweet.createMany({ data });
    }
  }
}