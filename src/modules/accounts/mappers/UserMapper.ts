import { User as PersistenceUser } from "@prisma/client";
import { User } from "../domain/User";

export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    const userOrError = User.create({
      slug: raw.slug,
      email: raw.email,
      password: raw.password,
      name: raw.name,
      avatar: raw.avatar,
      cover: raw.cover,
      bio: raw.bio,
      link: raw.link,
    }, raw.id)
    return null
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      slug: user.slug,
      email: user.email,
      password: user.password,
      name: user.name,
      avatar: user.avatar,
      cover: user.cover,
      bio: user.bio,
      link: user.link,
    }
  }
}