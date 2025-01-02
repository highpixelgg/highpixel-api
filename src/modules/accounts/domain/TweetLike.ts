import { Entity } from "../../../core/domain/Entity";
import { Tweet } from "./Tweet";
import { User } from "./User";

export interface ITweetLike {
  userSlug: string,
  tweetId: number,
  user: User,
  tweet: Tweet,
}

export class TweetLike extends Entity<ITweetLike> {
  private constructor(props: ITweetLike, id?: number) {
    super(props, id)
  }

  get userSlug() {
    return this.props.userSlug
  }

  get tweetId() {
    return this.props.tweetId
  }

  get user() {
    return this.props.tweet
  }

  get tweet() {
    return this.props.tweet
  }

  public static create(props: ITweetLike, id: number) {
    return new TweetLike(props, id)
  }
}