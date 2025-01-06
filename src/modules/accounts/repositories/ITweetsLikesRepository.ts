import { TweetsLikes } from "../domain/TweetsLikes"

export interface ITweetsLikesRepository {
  checkIfTweetIsLikedByUser(userId: string, tweetId: string): Promise<boolean>
  likeTweet(tweetId: string, authorId: string): Promise<void>
  unlikeTweet(tweetId: string, authorId: string): Promise<void>
  save(tweetsLikes: TweetsLikes): Promise<void>
}