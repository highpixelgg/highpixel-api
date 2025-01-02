import { User } from "../domain/User";

export class UserMapper {
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
      follow: user.follows,
      // tweets: user.tweets,
    }
  }
}