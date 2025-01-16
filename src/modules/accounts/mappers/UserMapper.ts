import {
  Notification as PersistenceNotification,
  User as PersistenceUser,
  Player,
  Profile,
} from "@prisma/client";
import { Notifications } from "../domain/Notifications";
import { User } from "../domain/User";
import { Email } from "../domain/email";
import { Name } from "../domain/name";
import { Password } from "../domain/password";
import { NotificationMapper } from "./NotificationMapper";

type PersistenteUserRaw = PersistenceUser & {
  notifications?: PersistenceNotification[];
  Profile: Profile;
  Player: Player;
}

export class UserMapper {
  static toDomain(raw: PersistenteUserRaw): User {
    const nameOrError = Name.create(raw.username);
    const emailOrError = Email.create(raw.email);
    const passwordOrError = Password.create(raw.password, true);  

    const notificationsErr = raw.notifications
      ? Notifications.create(
        raw.notifications.map(notifictation =>
          NotificationMapper.toDomain(notifictation)
        )
      )
      : Notifications.create([]);

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.');
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid.');
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.');
    }

    const userOrError = User.create({
      username: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      role: raw.role,
      Profile: raw.Profile,
      Player: raw.Player,
      isPremium: raw.isPremium,
      isVerified: raw.isVerified,
      notifications: notificationsErr,
      createdAt: raw.createdAt,
    }, raw.id)

    if (userOrError.isRight()) {
      return userOrError.value
    }

    return null
  }

  static toDto(raw: PersistenteUserRaw) {
    return {
      id: raw.id,
      username: raw.username,
      email: raw.email,
      role: raw.role,
      isPremium: raw.isPremium,
      isVerified: raw.isVerified,
      createdAt: raw.createdAt,
    }
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      username: user.username.value,
      email: user.email.value,
      password: await user.password.getHashedPassword(),
      role: user.role,
      isPremium: user.isPremium,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    }
  }
}