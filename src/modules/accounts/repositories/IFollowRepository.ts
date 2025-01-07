import { Follows } from "../domain/Follows"
import { User } from "../domain/User"

export interface IFollowRepository {
  follow(follows: Follows): Promise<void>
  unfollow(follows: Follows): Promise<void>
  getUserFollowingCount(userId1: string): Promise<number>
  getUserFollowersCount(userId2: string): Promise<number>
  checkIfFollows(userId1: string, userId2: string): Promise<boolean>
  getUserFollowing(userId: string): Promise<User[]>
}