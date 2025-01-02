import { Entity } from "../../../core/domain/Entity";
import { TweetLike } from "./TweetLike";
import { User } from "./User";

export interface ITweet {
  userSlug: string,
  body: string,
  image?: string,
  createdAt: Date,
  answerOf: number,
  user: User,
  likes: TweetLike,
}

export class Tweet extends Entity<ITweet> {
  private constructor(props: ITweet, id?: number) {
    super(props, id)
  }

  get userSlug() {
    return this.props.userSlug
  }

  get body() {
    return this.props.body
  }

  get image() {
    return this.props.image
  }

  get createdAt() {
    return this.props.createdAt
  }

  get answerOf() {
    return this.props.answerOf
  }

  get user() {
    return this.props.user
  }

  get likes() {
    return this.props.likes
  }

  public static create(props: ITweet, id?: number): Tweet {
    const tweet = new Tweet(props, id);
    return tweet
  }
}