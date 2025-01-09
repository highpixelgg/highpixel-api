import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { IFollowsRepository } from "modules/social/repositories/IFollowsRepository";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";

type SubscribeFollowerRequest = {
  followers_id?: string;
  user?: { id: string };
};

type SubscribeFollowerResponse = Either<ParametersErrors, boolean>;

export class SubscribeFollowerUnsubscribe {
  constructor(
    private followersRepository: IFollowsRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    followers_id,
    user,
  }: SubscribeFollowerRequest): Promise<SubscribeFollowerResponse> {
    const profileExists = await this.profilesRepository.exists(followers_id);

    if (!profileExists) {
      return left(new ParametersErrors("Profile not found."));
    }

    const profile = await this.profilesRepository.findOne(followers_id);
    const follower = await this.followersRepository.findByProfileParams({
      followers_id,
      following_id: user.id,
    });

    if (!follower) {
      return left(new ParametersErrors("You are not subscribed to this profile."));
    }

    profile.unsubscribeFollow(follower);

    await this.profilesRepository.save(profile);

    return right(true);
  }
}