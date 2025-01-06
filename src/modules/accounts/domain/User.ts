import { Roles } from "@prisma/client";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, right } from "core/logic/Either";
import { Entity } from "../../../core/domain/Entity";
import { Token } from "./Token";
import { Tokens } from "./Tokens";
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
  Tweet?: Tweets,
  TweetLike?: TweetsLikes,
  Tokens?: Tokens;
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

  get Tweet() {
    return this.props.Tweet
  }

  get TweetLike() {
    return this.props.TweetLike
  }

  get isPremium() {
    return this.props.isPremium
  }

  get isVerified() {
    return this.props.isVerified
  }

  get createdAt() {
    return this.props.createdAt
  }

  get role() {
    return this.props.role
  }

  get Tokens() {
    return this.props.Tokens
  }

  public addToken(token: Token) {
    this.Tokens.add(token)
  }

  public removeToken(token: Token) {
    this.Tokens.remove(token)
  }

  static create(props: IUserProps, id?: string): Either<ParametersErrors, User> {
    const user = new User({
      ...props,
      Tweet: props.Tweet ?? Tweets.create([]),
      TweetLike: props.TweetLike ?? TweetsLikes.create([]),
      Tokens: props.Tokens ?? Tokens.create([]),
    });

    return right(user)
  }
}