import { Entity } from "../../../core/domain/Entity";
import { Tweets } from "./Tweets";
import { TweetsLikes } from "./TweetsLikes";

export interface IUserProps {
  slug?: string,
  name: string,
  email: string,
  password: string,
  avatar?: string,
  cover?: string,
  bio?: string,
  link?: string,
  tweets?: Tweets,
  tweetsLikes?: TweetsLikes,
}

export class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  get slug() {
    return this.props.slug
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get name() {
    return this.props.name
  }

  get avatar() {
    return this.props.avatar
  }

  get cover() {
    return this.props.cover
  }

  get bio() {
    return this.props.bio
  }

  get link() {
    return this.props.link
  }

  get tweets() {
    return this.props.tweets
  }

  get tweetsLikes() {
    return this.props.tweetsLikes
  }

  static create(props: IUserProps, id?: string) {
    return new User({
      ...props,
      tweets: props.tweets ?? Tweets.create([]),
      tweetsLikes: props.tweetsLikes ?? TweetsLikes.create([]),
    });
  }
}