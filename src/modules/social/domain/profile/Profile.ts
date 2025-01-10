import { Badges, User } from "@prisma/client";
import { Entity } from "core/domain/Entity";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, right } from "core/logic/Either";
import { Follow } from "./Follow";
import { Follows } from "./Follows";
import { Visitor } from "./Visitor";
import { Visitors } from "./Visitors";

export interface IProfileProps {
  nickname: string,
  slug: string,
  avatar: string,
  cover: string,
  bio: string,
  link: string,
  badges: Badges[];
  visitors?: Visitors;
  follows?: Follows;
  followers?: Follows | object[];
  following: Follows | object[];
  userId: string,
  User?: User,
}

export class Profile extends Entity<IProfileProps> {
  private constructor(props: IProfileProps, id?: string) {
    super(props, id)
  }

  get nickname() {
    return this.props.nickname
  }

  get slug() {
    return this.props.slug
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

  get userId() {
    return this.props.userId
  }

  get badges() {
    return this.props.badges
  }

  get follows() {
    return this.props.follows;
  }

  get following() {
    return this.props.following;
  }

  get followers() {
    return this.props.followers;
  }

  get visitors() {
    return this.props.visitors;
  }

  get user() {
    return this.props.User;
  }

  get User() {
    return this.props.User
  }

  set setNickname(nickname: string) {
    this.props.nickname = nickname
  }

  public setSlug(slug: string): void {
    this.props.slug = slug;
  }

  set setBio(bio: string) {
    this.props.bio = bio
  }

  set setLink(url: string) {
    this.props.link = url
  }

  set setAvatarURL(url: string) {
    this.props.avatar = url
  }

  set setCoverURL(url: string) {
    this.props.cover = url
  }

  public subscribeToVisitor(visitor: Visitor) {
    this.visitors.add(visitor);
  }

  public subscribeFollow(follow: Follow) {
    this.follows.add(follow);
  }

  public unsubscribeFollow(follow: Follow) {
    this.follows.remove(follow);
  }

  static create(props: IProfileProps, id?: string): Either<ParametersErrors, Profile> {
    const profile = new Profile({
      ...props,
      visitors: props.visitors ?? Visitors.create([]),
      follows: props.follows ?? Follows.create([]),
    }, id)

    return right(profile)
  }
}