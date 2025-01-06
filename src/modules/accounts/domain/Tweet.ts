import { Entity } from "../../../core/domain/Entity";
import { TweetLike } from "./TweetLike";
import { User } from "./User";

export interface ITweet {
  authorId: string,
  body: string,
  image?: string,
  createdAt?: Date,
  answerOf?: number,
  user: User,
  tweetLikes?: TweetLike[],
}

export class Tweet extends Entity<ITweet> {
  private constructor(props: ITweet, id?: string) {
    super(props, id)
  }

  get authorId() {
    return this.props.authorId
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

  get tweetLikes() {
    return this.props.tweetLikes
  }

  public static create(props: ITweet, id?: string): Tweet {
    const tweet = new Tweet(props, id);
    return tweet
  }
}