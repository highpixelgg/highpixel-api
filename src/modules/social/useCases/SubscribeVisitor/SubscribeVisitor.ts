import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, left, right } from "core/logic/Either";
import { Visitor } from "modules/social/domain/profile/Visitor";
import { IProfilesRepository } from "modules/social/repositories/IProfileRepository";
import { IVisitorRepository } from "modules/social/repositories/IVisitorRepository";

type SubscribeVisitorRequest = {
  visitor_id?: string;
  visitors_id?: string;
};

type SubscribeVisitorResponse = Either<ParametersErrors, boolean>;

export class SubscribeVisitor {
  constructor(
    private profilesRepository: IProfilesRepository,
    private visitorsRepository: IVisitorRepository
  ) { }

  async execute({
    visitor_id,
    visitors_id,
  }: SubscribeVisitorRequest): Promise<SubscribeVisitorResponse> {
    if (visitor_id === visitors_id) {
      return right(true);
    }

    const userExists = await this.profilesRepository.exists(visitor_id);
    const profileExists = await this.profilesRepository.exists(visitors_id);

    if (!profileExists) {
      return left(new ParametersErrors('Profile not found.'));
    }

    if (!userExists) {
      return left(new ParametersErrors('User not found.'));
    }

    const profile = await this.profilesRepository.findOne(visitors_id);

    const alreadySubscribetToVisitor =
      await this.visitorsRepository.findByProfileParams({
        visitors_id,
        visitor_id,
      });

    if (alreadySubscribetToVisitor) {
      return left(new ParametersErrors('Already subscribed.'));
    }

    const visitor = Visitor.create({
      visitors_id,
      visitor_id,
    });

    profile.subscribeToVisitor(visitor);
    await this.profilesRepository.save(profile);

    return right(true);
  }
}