import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";

type GetProfileResponse = object;
type GetProfileDetails = Either<ParametersErrors, GetProfileResponse>;

export class GetProfile {
  constructor(private profilesRepository: IProfilesRepository) { }

  async execute({ ident, user }): Promise<GetProfileDetails> {
    const exists = await this.profilesRepository.exists(ident);

    if (!exists) {
      return left(new ParametersErrors("Profile not found."));
    }

    const profile = await this.profilesRepository.findOne(ident);
    const requestUser = await this.profilesRepository.findOne(profile.userId);
    const userfollows = requestUser.following as object[];
    const isFollowing = userfollows.find((follow: any) => follow.followers_id === profile.userId);

    const {
      slug,
      avatar,
      cover,
      User,
      bio,
      link,
      badges,
      following,
      followers,
    } = profile;

    return right({
      ...User,
      slug,
      avatar,
      cover,
      bio,
      link,
      badges,
      following,
      followers,
      isFollowing: Boolean(isFollowing) ? Boolean(isFollowing) : false,
    });
  }
}