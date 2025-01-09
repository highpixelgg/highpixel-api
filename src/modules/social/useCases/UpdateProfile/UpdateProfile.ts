import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Slug } from "modules/social/domain/profile/slug";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";
import { UpdateProfileRequest } from "./UpdateProfileDTO";

type UpdaProfileResponse = Either<ParametersErrors, boolean>;

export class UpdateProfile {
  constructor(private profilesRepository: IProfilesRepository) { }
  async execute({
    user,
    name,
    bio,
    link,
    slug,
    action,
  }: UpdateProfileRequest): Promise<UpdaProfileResponse> {
    if (!action) {
      return left(new ParametersErrors('Action is required.'));
    }
    const profile = await this.profilesRepository.findOne(user.id);

    if (!profile) {
      return left(new ParametersErrors('Profile not found.'));
    }

    if (action === 'update:social') {
      profile.setNickname = name ? name : null;
      profile.setBio = bio ? bio : null;
      profile.setLink = link ? link : null;

      if (slug !== profile.slug.value) {
        const exists = await this.profilesRepository.exists(slug);

        if (exists) {
          return left(new ParametersErrors('Slug already in use.'));
        }

        if (profile.user.isPremium) {
          const slugOrError = Slug.create(slug);

          if (slugOrError.isLeft()) {
            return left(new ParametersErrors('Invalid slug.'));
          }
          profile.updateSlug(slugOrError.value);
        } else {
          return left(new ParametersErrors('You need to be a premium user to change the slug.'));
        }
      }
    }
    await this.profilesRepository.save(profile);
    return right(true);
  }
}