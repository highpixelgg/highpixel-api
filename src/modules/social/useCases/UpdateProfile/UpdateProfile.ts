import { ParametersErrors } from "@core/domain/errors/ParameterErrors";
import { Either, left, right } from "@core/logic/Either";
import { IProfilesRepository } from "@modules/social/repositories/IProfileRepository";

type UpdateProfileRequest = {
  user: { id: string };
  nickname?: string;
  slug?: string;
  bio?: string;
  link?: string;
  action: string;
};

type UpdaProfileResponse = Either<ParametersErrors, boolean>;

export class UpdateProfile {
  constructor(private profilesRepository: IProfilesRepository) { }

  async execute({
    action,
    user,
    slug,
    nickname,
    bio,
    link,
  }: UpdateProfileRequest): Promise<UpdaProfileResponse> {
    if (!action) {
      return left(new ParametersErrors('action is required'));
    }

    const profile = await this.profilesRepository.findOne(user.id);

    if (!profile) {
      return left(new ParametersErrors('Profile not found'));
    }

    if (action === 'update:bio') {
      profile.setBio = bio ? bio : null;
      profile.setLink = link ? link : null;
    }

    if (action === 'update:social') {
      profile.setNickname = nickname;
      profile.setSlug = slug;

      if (slug !== profile.slug) {
        const exists = await this.profilesRepository.exists(slug);

        if (exists) {
          return left(new ParametersErrors('Slug already exists'));
        }
      }
    }

    await this.profilesRepository.save(profile);
    return right(true);
  }
}
