import { Tweet } from "../domain/Tweet"
import { Tweets } from "../domain/Tweets"

export interface ITweetsRepository {
  findTweetById(tweetId: string): Promise<Tweet>
  findTweetsByUser(id: string, currentPage: number, perPage: number): Promise<Tweet[]>
  findAnswersTweet(answerId: number): Promise<Tweet[]>
  findTweetFeed(following: string[], currentPage: number, perPage: number): Promise<Tweet[]>
  findTweetsByBody(bodyContains: string, currentPage: number, perPage: number): Promise<Tweet[]>
  getUserTweetCount(userId: string):Promise<number>
  create(tweets: Tweets): Promise<void>
  save(tweets: Tweets): Promise<void>
}