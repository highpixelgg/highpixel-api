import { Roles, Tokens } from "@prisma/client";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, right } from "core/logic/Either";
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
  isPremium?: boolean,
  isVerified?: boolean,
  createdAt?: Date,
  role?: Roles,
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

  get isPremium() {
    return this.props.isPremium
  }

  get isVerified() {
    return this.props.isVerified
  }

  get createdAt() {
    return this.createdAt
  }

  static create(props: IUserProps, id?: string): Either<ParametersErrors, User> {
    const user = new User({
      ...props,
      tweets: props.tweets ?? Tweets.create([]),
      tweetsLikes: props.tweetsLikes ?? TweetsLikes.create([]),
    });

    return right(user)
  }
}