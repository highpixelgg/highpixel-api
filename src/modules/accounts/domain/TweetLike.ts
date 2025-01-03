import { Entity } from "../../../core/domain/Entity";
import { Tweet } from "./Tweet";
import { User } from "./User";

export interface ITweetLike {
  userId: string,
  tweetId: string,
  user: User,
  tweet: Tweet,
}

export class TweetLike extends Entity<ITweetLike> {
  private constructor(props: ITweetLike, id?: string) {
    super(props, id)
  }

  get userId() {
    return this.props.userId
  }

  get tweetId() {
    return this.props.tweetId
  }

  get user() {
    return this.props.user
  }

  get tweet() {
    return this.props.tweet
  }

  public static create(props: ITweetLike, id?: string) {
    const tweetLike = new TweetLike(props, id)
    return tweetLike
  }
}