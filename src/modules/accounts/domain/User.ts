import { Profile, Roles } from "@prisma/client";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, right } from "core/logic/Either";
import { Entity } from "../../../core/domain/Entity";
import { Email } from "./email";
import { Name } from "./name";
import { Notification } from "./Notification";
import { Notifications } from "./Notifications";
import { Password } from "./password";
import { Token } from "./Token";
import { Tokens } from "./Tokens";

export interface IUserProps {
  username: Name,
  email: Email,
  password: Password,
  role?: Roles,
  Profile?: Profile,
  isPremium?: boolean,
  isVerified?: boolean,
  notifications?: Notifications;
  createdAt?: Date,
  Tokens?: Tokens;
}

export class User extends Entity<IUserProps> {
  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
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

  get notifications() {
    return this.props.notifications;
  }

  get Tokens() {
    return this.props.Tokens
  }

  get Profile() {
    return this.props.Profile 
  }

  set setPassword(password: Password) {
    this.props.password = password;
  }

  public addNotification(notification: Notification) {
    this.notifications.add(notification);
  }

  public removeNotification(notification: Notification) {
    this.notifications.remove(notification);
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
      notifications: props.notifications ?? Notifications.create([]),
      Tokens: props.Tokens ?? Tokens.create([]),
    }, id);

    return right(user)
  }
}