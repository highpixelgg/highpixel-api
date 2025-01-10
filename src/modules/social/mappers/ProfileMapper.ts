
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
      userId: '',
    }, raw.id)

    if (profileOrError.isRight()) {
      return profileOrError.value;
    }

    return null;
  }
  static async toPersistence(profile: Profile) {
    return {
      nickname: profile.nickname,
      slug: profile.slug,
      avatar: profile.avatar,
      cover: profile.cover,
      bio: profile.bio,
      link: profile.link,
    }
  }
}