import { User as PersistenceUser } from "@prisma/client";
import { User } from "../domain/User";
import { ITweetsRepository } from "../repositories/ITweetsRepository";
import { ITweetsLikesRepository } from "../repositories/ITweetsLikesRepository";
import { ITokensRepository } from "../repositories/ITokensRepository";
import { Tweet as PersistenceTweet, TweetLike as PersistenceTweetLike } from "@prisma/client";
import { Tweets } from "../domain/Tweets";
import { TweetMapper } from "./TweetMapper";
import { TweetLike } from "../domain/TweetLike";
import { TweetLikeMapper } from "./TweetLikeMapper";
import { TweetsLikes } from "../domain/TweetsLikes";

type PersistenteUserRaw = PersistenceUser & {
  tweets?: PersistenceTweet[],
  tweetLike?: PersistenceTweetLike[],
}

export class UserMapper {
  static toDomain(raw: PersistenteUserRaw): User {
    const tweetsOrError = raw.tweets
    ? Tweets.create(  
        raw.tweets.map(tweet =>
          TweetMapper.toDomain(tweet)
        )
      )
    : Tweets.create([]);

    const tweetsLikesOrError = raw.tweetLike
      ? TweetsLikes.create(
          raw.tweetLike.map(tweetsLikes =>
            TweetLikeMapper.toDomain(tweetsLikes)
          )
        )
      : TweetsLikes.create([]);


    const userOrError = User.create({
      slug: raw.slug,
      email: raw.email,
      password: raw.password,
      name: raw.name,
      avatar: raw.avatar,
      cover: raw.cover,
      bio: raw.bio,
      link: raw.link,
      isPremium: raw.isPremium,
      isVerified: raw.isVerified,
      role: raw.role,
      createdAt: raw.createdAt,
      Tweet: tweetsOrError,
      TweetLike: tweetsLikesOrError,
    }, raw.id)
    
    if(userOrError.isRight()) {
      return userOrError.value
    }

    return null
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      slug: user.slug,
      email: user.email,
      password: user.password,
      name: user.name,
      avatar: user.avatar,
      cover: user.cover,
      bio: user.bio,
      link: user.link,
      isPremium: user.isPremium,
      isVerified: user.isVerified,
      role: user.role,
      createdAt: user.createdAt,
    }
  }
}