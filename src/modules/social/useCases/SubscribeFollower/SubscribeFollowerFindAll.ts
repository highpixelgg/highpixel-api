import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Follow } from "modules/social/domain/profile/Follow";
import { IFollowsRepository } from "modules/social/repositories/IFollowsRepository";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";

type SubscribeFollowerFindAllRequest = {
  followers_id: string;
};

type SubscribeFollowersFindAllResponse = Either<ParametersErrors,Follow[]>;

export class SubscribeFollowerFindAll {
  constructor(
    private followersRepository: IFollowsRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    followers_id,
  }: SubscribeFollowerFindAllRequest): Promise<SubscribeFollowersFindAllResponse> {
    const exists = await this.profilesRepository.exists(followers_id);

    if (!exists) {
      return left(new ParametersErrors("Profile not found."));
    }

    const followers = await this.followersRepository.findAllByProfileParams({
      followers_id,
    });

    return right(followers);
  }
}