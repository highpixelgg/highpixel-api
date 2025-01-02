import { Follow } from "@prisma/client";
import { Entity } from "../../../core/domain/Entity";
import { Follows } from "./Follows";
import { Tweet } from "./Tweet";
import { Tweets } from "./Tweets";

export interface IUserProps {
  slug?: string,
  name: string,
  email: string,
  password: string,
  avatar?: string,
  cover?: string,
  bio?: string,
  link?: string,
  follows?: Follows,
  tweets?: Tweets,
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

  get follows() {
    return this.props.follows
  }

  get tweets() {
    return this.props.tweets
  }

  static create(props: IUserProps, id?: string) {
    return new User({
      ...props,
      follows: props.follows ?? Follows.create([]),
      tweets: props.tweets ?? Tweets.create([]),
    });
  }
}