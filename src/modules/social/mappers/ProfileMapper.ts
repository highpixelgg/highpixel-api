
import {
  Badges,
  Follower,
  Profile as ProfileRaw,
  User
} from '@prisma/client';
import { Profile } from '../domain/profile/Profile';

export type PersistenceProfileRaw = ProfileRaw & {
  user?: User;
  following?: Follower[];
  followers?: Follower[];
  badges?: Badges[];
};

type topPeristenceRaw = {
  nickname: string;
  slug: string;
  avatar: string;
  cover: string;
  bio: string;
  link: string;
}

export class ProfileMapper {
  static toDomain(raw: PersistenceProfileRaw): Profile {
    const profileOrError = Profile.create({
      User: raw.user,
      nickname: raw.nickname,
      slug: raw.slug,
      avatar: raw.avatar,
      cover: raw.cover,
      bio: raw.bio,
      link: raw.link,
      badges: raw.badges,
      followers: raw.followers,
      following: raw.following,
      userId: raw.userId,
    }, raw.id)

    if (profileOrError.isRight()) {
      return profileOrError.value;
    }

    return null;
  }
  static toPersistence(raw: topPeristenceRaw) {
    return {
      nickname: raw.nickname,
      slug: raw.slug,
      avatar: raw.avatar,
      cover: raw.cover,
      bio: raw.bio,
      link: raw.link,
    }
  }
}