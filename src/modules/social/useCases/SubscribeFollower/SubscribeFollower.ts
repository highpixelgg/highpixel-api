import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Follow } from "modules/social/domain/profile/Follow";
import { IFollowsRepository } from "modules/social/repositories/IFollowsRepository";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";

type SubscribeFollowerRequest = {
  followers_id?: string;
  user: { id: string };
};

type SubscribeFollowerResponse = Either<ParametersErrors, boolean>;

export class SubscribeFollower {
  constructor(
    private followersRepository: IFollowsRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    followers_id,
    user,
  }: SubscribeFollowerRequest): Promise<SubscribeFollowerResponse> {
    if (followers_id === user.id) {
      return right(true);
    }

    const profileExists = await this.profilesRepository.exists(followers_id);

    if (!profileExists) {
      return left(new ParametersErrors("Profile not found."));
    }

    const profile = await this.profilesRepository.findOne(followers_id);

    const alreadySubscribetToVisitor =
      await this.followersRepository.findByProfileParams({
        followers_id,
        following_id: user.id,
      });

    if (alreadySubscribetToVisitor) {
      return left(new ParametersErrors("You are already subscribed to this profile."));
    }

    const follow = Follow.create({
      followers_id,
      following_id: user.id,
    });

    profile.subscribeFollow(follow);
    await this.profilesRepository.save(profile);

    return right(true);
  }
}